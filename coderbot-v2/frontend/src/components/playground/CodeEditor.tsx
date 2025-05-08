// CodeEditor.tsx
// Enhanced IDE-like editor with real filesystem support and native terminal via Tauri plugins
// ----------------------------------------------------------------------------

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import Editor, { OnMount, BeforeMount } from "@monaco-editor/react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { Play, Plus, Save as SaveIcon, Files, MessageSquare, FolderPlus } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// Tauri imports
import { invoke } from "@tauri-apps/api/core";
import { Command } from "@tauri-apps/plugin-shell";
import { open } from '@tauri-apps/plugin-dialog';

// Monaco imports
import * as monaco from 'monaco-editor';

// ------- Types & constants -------------------------------------------
export type Language = "javascript" | "python";
interface FileNode {
  id: string;
  name: string;
  lang: Language;
  code: string;
  dirty: boolean;
}

// File tree node type
interface FileTreeNode {
  id: string;
  name: string;
  type: "file" | "directory";
  children?: FileTreeNode[];
  fileId?: string; // link to FileNode.id
}

const DEFAULT_FILES: FileNode[] = [
  { id: "1", name: "main.py", lang: "python", code: "print('Hello, world!')", dirty: false },
];

// Manokai theme definition
const manokaiTheme: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark' as monaco.editor.BuiltinTheme,
  inherit: true,
  rules: [
    { token: '', foreground: 'd4d4d4', background: '1e1e1e' },
    { token: 'comment', foreground: '6a9955' },
    { token: 'keyword', foreground: 'c586c0' },
    { token: 'string', foreground: 'ce9178' },
    { token: 'number', foreground: 'b5cea8' },
    { token: 'function', foreground: 'dcdcaa' },
    { token: 'variable', foreground: '9cdcfe' },
    { token: 'type', foreground: '4ec9b0' },
    { token: 'class', foreground: '4ec9b0' },
    { token: 'interface', foreground: '4ec9b0' },
    { token: 'enum', foreground: '4ec9b0' },
    { token: 'parameter', foreground: '9cdcfe' },
    { token: 'property', foreground: '9cdcfe' },
    { token: 'method', foreground: 'dcdcaa' },
    { token: 'macro', foreground: 'c586c0' },
    { token: 'operator', foreground: 'd4d4d4' },
    { token: 'punctuation', foreground: 'd4d4d4' },
    { token: 'regexp', foreground: 'd16969' },
    { token: 'tag', foreground: '569cd6' },
    { token: 'attribute', foreground: '9cdcfe' },
  ],
  colors: {
    'editor.background': '#1e1e1e',
    'editor.foreground': '#d4d4d4',
    'editor.lineHighlightBackground': '#2d2d2d',
    'editor.selectionBackground': '#264f78',
    'editor.inactiveSelectionBackground': '#3a3d41',
    'editorCursor.foreground': '#d4d4d4',
    'editorWhitespace.foreground': '#404040',
    'editorLineNumber.foreground': '#858585',
    'editorLineNumber.activeForeground': '#c6c6c6',
    'editorGutter.background': '#1e1e1e',
    'editorGutter.modifiedBackground': '#0c2d1b',
    'editorGutter.addedBackground': '#0c2d1b',
    'editorGutter.deletedBackground': '#2a0d0d',
  }
};

// ------- Workspace helpers -------------------------------------------
async function getWorkspaceDir(): Promise<string> {
  try {
    return await invoke<string>("get_workspace_dir");
  } catch (error) {
    console.error("Error getting workspace directory:", error);
    return "./";
  }
}

async function listFiles(): Promise<string[]> {
  try {
    // First ensure the workspace directory exists
    await invoke("ensure_dir", { dirname: "" });
    
    // Then list files
    return await invoke<string[]>("list_workspace_files");
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
}

async function loadFile(name: string): Promise<string> {
  try {
    console.log('Loading file:', name);
    return await invoke<string>("read_file", { filename: name });
  } catch (error) {
    console.error(`Error loading file ${name}:`, error);
    return `# Error loading file: ${error}`;
  }
}

async function saveFileToDisk(name: string, content: string): Promise<void> {
  try {
    console.log('Saving file:', name);
    
    // Ensure directory exists
    await invoke("ensure_dir", { dirname: "" });
    
    // Write file
    await invoke("write_file", { filename: name, content });
    console.log('File saved successfully');
  } catch (error) {
    console.error("Error saving file:", error);
    toast.error(`Failed to save: ${error}`);
    throw error;
  }
}

// ------- Chat Component -------------------------------------------
const MiniChat: React.FC<{ onSendMessage: (message: string) => void }> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message to history
    setChatHistory(prev => [...prev, `Você: ${message}`]);
    
    // Send message to parent
    onSendMessage(message);
    
    // Clear input
    setMessage("");
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-2 space-y-2 bg-black/20"
      >
        {chatHistory.map((msg, idx) => (
          <div 
            key={idx} 
            className={cn(
              "p-2 rounded text-sm",
              msg.startsWith('Você:') ? "bg-blue-500/20" : "bg-green-500/20"
            )}
          >
            {msg}
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="sm">
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

// Utility: build file tree from paths
function buildFileTree(files: FileNode[]): FileTreeNode[] {
  const root: FileTreeNode[] = [];
  for (const file of files) {
    const parts = file.name.split("/");
    let current = root;
    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      let node = current.find(n => n.name === name);
      if (!node) {
        node = {
          id: crypto.randomUUID(),
          name,
          type: i === parts.length - 1 ? "file" : "directory",
          children: i === parts.length - 1 ? undefined : [],
        };
        if (i === parts.length - 1) node.fileId = file.id;
        current.push(node);
      }
      if (node.type === "directory") {
        current = node.children!;
      }
    }
  }
  return root;
}

// FileTree component
const FileTree: React.FC<{
  nodes: FileTreeNode[];
  activeId: string;
  onSelect: (fileId: string) => void;
}> = ({ nodes, activeId, onSelect }) => {
  const [open, setOpen] = useState<{ [id: string]: boolean }>({});
  return (
    <ul className="pl-2 select-none">
      {nodes.map(node => (
        <li key={node.id}>
          {node.type === "directory" ? (
            <>
              <span
                className="cursor-pointer font-semibold text-purple-700 hover:underline"
                onClick={() => setOpen(o => ({ ...o, [node.id]: !o[node.id] }))}
              >
                {open[node.id] ? "▼" : "▶"} {node.name}
              </span>
              {open[node.id] && node.children && (
                <FileTree nodes={node.children} activeId={activeId} onSelect={onSelect} />
              )}
            </>
          ) : (
            <span
              className={cn(
                "cursor-pointer pl-5 block py-0.5 rounded hover:bg-purple-100",
                node.fileId === activeId && "bg-purple-200 font-bold"
              )}
              onClick={() => onSelect(node.fileId!)}
            >
              {node.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

// ----------------- Component -----------------------------------------
export const CodeEditor: React.FC = () => {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [activeId, setActiveId] = useState<string>("1");
  const activeFile = files.find(f => f.id === activeId) || DEFAULT_FILES[0];
  const [showTerminal, setShowTerminal] = useState(false);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [folderPath, setFolderPath] = useState<string | null>(null);

  const xtermRef = useRef<XTerm>();
  const fitAddonRef = useRef<FitAddon>();
  const xtermEl = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<Parameters<OnMount>[0]>();

  const [isRunning, setIsRunning] = useState(false);

  // Load files from disk on mount
  useEffect(() => {
    (async () => {
      const names = await listFiles();
      if (names.length === 0) {
        // Initialize with default if empty
        await saveFileToDisk(DEFAULT_FILES[0].name, DEFAULT_FILES[0].code);
      }
      const fileObjs = await Promise.all(
        (names.length ? names : [DEFAULT_FILES[0].name]).map(async (name, idx) => {
          const lang = name.endsWith(".py") ? "python" as Language : "javascript" as Language;
          return {
          id: crypto.randomUUID(),
          name,
            lang,
          code: await loadFile(name),
          dirty: false,
          };
        })
      );
      setFiles(fileObjs);
      setActiveId(fileObjs[0].id);
    })();
  }, []);

  // Initialize xterm
  useEffect(() => {
    xtermRef.current = new XTerm({ convertEol: true, fontFamily: "JetBrains Mono" });
    fitAddonRef.current = new FitAddon();
    xtermRef.current.loadAddon(fitAddonRef.current);
    return () => xtermRef.current?.dispose();
  }, []);

  // Attach xterm to DOM
  useEffect(() => {
    if (xtermEl.current && xtermRef.current) {
      xtermRef.current.open(xtermEl.current);
      fitAddonRef.current?.fit();
    }
  }, []);

  // Print to terminal
  const print = useCallback((msg: string, clear = false) => {
    if (!xtermRef.current) return;
    if (clear) xtermRef.current.clear();
    xtermRef.current.write(msg.replace(/\n/g, "\r\n"));
  }, []);

  // Save file to disk
  const handleSave = useCallback(async () => {
    await saveFileToDisk(activeFile.name, monacoRef.current?.getValue() || activeFile.code);
    setFiles(prev => prev.map(f => f.id === activeId ? { ...f, dirty: false } : f));
    toast.success("Saved to disk");
  }, [activeFile, activeId]);

  // Run file natively
  const runNative = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    print("Running...\n", true);
    await handleSave();

    const dir = await getWorkspaceDir();
    try {
      const command = Command.create(
      activeFile.lang === "python" ? "python" : "node",
        [activeFile.name],
        { cwd: dir }
    );
      command.on("close", () => {
        setIsRunning(false);
      toast.success("Execution finished");
      });
      command.stdout.on("data", line => print(line));
      command.stderr.on("data", line => print(`[err] ${line}`));
      await command.spawn();
    } catch (e) {
      console.error("Execution error:", e);
      toast.error("Error during execution");
      setIsRunning(false);
    }
  }, [activeFile, handleSave, isRunning, print]);

  // Editor change
  const updateCode = (code: string) => {
    setFiles(prev => prev.map(f => f.id === activeId ? { ...f, code, dirty: true } : f));
  };

  // Keybindings
  const handleKey = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      runNative();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  // Monaco theme setup
  const beforeMount: BeforeMount = monaco => {
    monaco.editor.defineTheme('manokai', manokaiTheme);
    monaco.editor.setTheme('manokai');
  };

  // Create a new file
  const createNewFile = useCallback(async () => {
    const newFileName = prompt("Enter filename (e.g. script.py):");
    if (!newFileName) return;
    
    const fileExtension = newFileName.split('.').pop() || "";
    const lang = fileExtension === "py" ? "python" as Language : "javascript" as Language;
    const defaultCode = lang === "python" ? "# New Python file\n\nprint('Hello, world!')" : 
      "// New JavaScript file\n\nconsole.log('Hello, world!');";
    
    const newFile: FileNode = {
      id: crypto.randomUUID(),
      name: newFileName,
      lang,
      code: defaultCode,
      dirty: true
    };
    
    setFiles(prev => [...prev, newFile]);
    setActiveId(newFile.id);
    
    try {
      await saveFileToDisk(newFile.name, newFile.code);
      toast.success(`Created ${newFile.name}`);
    } catch (error) {
      console.error("Error creating file:", error);
      toast.error("Failed to create file");
    }
  }, []);

  // Create a new folder
  const createNewFolder = useCallback(async () => {
    const newFolderName = prompt("Enter folder name (e.g. src or src/utils):");
    if (!newFolderName) return;
    try {
      await invoke("ensure_dir", { dirname: newFolderName });
      toast.success(`Created folder ${newFolderName}`);
      // Refresh file list
      const names = await listFiles();
      const fileObjs = await Promise.all(
        (names.length ? names : [DEFAULT_FILES[0].name]).map(async (name, idx) => {
          const lang = name.endsWith(".py") ? "python" as Language : "javascript" as Language;
          return {
            id: crypto.randomUUID(),
            name,
            lang,
            code: await loadFile(name),
            dirty: false,
          };
        })
      );
      setFiles(fileObjs);
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Failed to create folder");
    }
  }, []);

  const handleChatMessage = async (message: string) => {
    try {
      // Envia a mensagem para o backend Rust
      const response = await invoke<string>("chat_with_continue", { message });
      setChatHistory(prev => [...prev, `Continue: ${response}`]);
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
      toast.error("Erro ao processar mensagem");
    }
  };

  const handleOpenFolder = async () => {
    const selected = await open({ directory: true });
    if (selected) {
      setFolderPath(selected as string);
      // Chame sua função para listar arquivos dessa pasta
      // Ex: listFiles(selected)
    }
  };

  return (
    <div className="flex h-full flex-col" onKeyDown={handleKey}>
      <Toaster />
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 h-9 border-b bg-muted/30">
        <Button size="icon" variant="ghost" onClick={createNewFile}>
          <Plus className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={createNewFolder}>
          <FolderPlus className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleOpenFolder}>
          <Files className="w-4 h-4" />
        </Button>
        <span className="flex-1 text-sm truncate">{activeFile.name}</span>
        <Button size="icon" variant="ghost" onClick={handleSave}>
          <SaveIcon className={cn("w-4 h-4", activeFile.dirty && "text-yellow-500")} />
        </Button>
        <Button size="icon" onClick={runNative} disabled={isRunning}>
          <Play className="w-4 h-4" />
        </Button>
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={() => setShowTerminal(!showTerminal)}
          className={cn(showTerminal && "text-blue-500")}
        >
          <MessageSquare className="w-4 h-4" />
        </Button>
      </div>

      <PanelGroup direction="horizontal" className="flex-1">
        {/* File Explorer Panel */}
       
        <PanelResizeHandle className="w-2 bg-border" />

        {/* Editor + Chat/Terminal */}
        <Panel>
          <PanelGroup direction="vertical" className="h-full">
            <Panel defaultSize={70} minSize={30}>
              <Editor
                beforeMount={beforeMount}
                onMount={editor => (monacoRef.current = editor)}
                theme="manokai"
                language={activeFile.lang}
                value={activeFile.code}
                onChange={v => updateCode(v || "")}
                options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
                height="100%"
              />
            </Panel>
            <PanelResizeHandle className="h-2 bg-border" />
            <Panel minSize={20} className="bg-black text-white text-xs">
              {showTerminal ? (
                <MiniChat onSendMessage={handleChatMessage} />
              ) : (
              <div ref={xtermEl} className="h-full" />
              )}
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};
