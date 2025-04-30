/*
  Modern IDE-like Code Editor – VS Code mini (no direct monaco import)
  ------------------------------------------------------------------
  • Theme defined via beforeMount → no ts error
*/

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import Editor, { OnMount, BeforeMount } from "@monaco-editor/react";

import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit"; 
import "xterm/css/xterm.css";
import {
  Play,
  Plus,
  Save as SaveIcon,
  Files,
  Trash,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// ------- Types & constants -------------------------------------------
export type Language = "javascript" | "python";
interface FileNode {
  id: string;
  name: string;
  lang: Language;
  code: string;
  dirty: boolean;
}

const LS_KEY = "ide-files-v1";
const DEFAULT_FILES: FileNode[] = [
  {
    id: "1",
    name: "main.py",
    lang: "python",
    code: "print('Hello, world!')",
    dirty: false,
  },
];

// ---------- localStorage helpers -------------------------------------
const loadFiles = (): FileNode[] => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as FileNode[]) : DEFAULT_FILES;
  } catch {
    return DEFAULT_FILES;
  }
};
const saveFiles = (files: FileNode[]) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(files));
  } catch {/* ignore */}
};

// ----------------------------------------------------------------------
export const CodeEditor: React.FC = () => {
  const [files, setFiles] = useState<FileNode[]>(loadFiles());
  const [activeId, setActiveId] = useState(files[0].id);
  const activeFile = files.find((f) => f.id === activeId)!;

  const xtermRef = useRef<XTerm>();
  const fitAddonRef = useRef<FitAddon>();
  const xtermEl = useRef<HTMLDivElement>(null);

  const monacoRef = useRef<Parameters<OnMount>[0]>();

  const [isRunning, setIsRunning] = useState(false);

  // -------- persistence ----------------------------------------------
  useEffect(() => saveFiles(files), [files]);

  // -------- XTerm init -----------------------------------------------
  useEffect(() => {
    xtermRef.current = new XTerm({ convertEol: true, fontFamily: "JetBrains Mono" });
    fitAddonRef.current = new FitAddon();
    xtermRef.current.loadAddon(fitAddonRef.current);
    return () => xtermRef.current?.dispose();
  }, []);

  useEffect(() => {
    if (xtermEl.current && xtermRef.current) {
      xtermRef.current.open(xtermEl.current);
      fitAddonRef.current?.fit();
    }
  }, []);

  const print = (msg: string, clear = false) => {
    if (!xtermRef.current) return;
    if (clear) xtermRef.current.clear();
    xtermRef.current.write(msg.replace(/\n/g, "\r\n"));
  };

  // -------- actions ---------------------------------------------------
  const addFile = () => {
    const id = Date.now().toString();
    setFiles((prev) => [
      ...prev,
      { id, name: `script_${prev.length + 1}.js`, lang: "javascript", code: "console.log('new')", dirty: false },
    ]);
    setActiveId(id);
  };

  const updateCode = (code: string) => {
    setFiles((prev) => prev.map((f) => (f.id === activeId ? { ...f, code, dirty: true } : f)));
  };

  const saveFile = () => {
    setFiles((prev) => prev.map((f) => (f.id === activeId ? { ...f, dirty: false } : f)));
    toast.success("Saved");
  };

  const run = async () => {
    if (isRunning) return;
    setIsRunning(true);
    print("Running...\n", true);
    await new Promise((r) => setTimeout(r, 500));
    print(activeFile.code);
    toast.success("Done");
    setIsRunning(false);
  };

  const handleKey = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      saveFile();
    }
  };

  const beforeMount: BeforeMount = (monaco) => {
    // register theme once
    // monaco.editor.defineTheme("vscode-dark", vsTheme as any);
  };

  // -------- render ----------------------------------------------------
  return (
    <div className="flex h-full flex-col bg-code" onKeyDown={handleKey}>
      <Toaster />
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 h-9 border-b bg-muted/30">
        <Button size="icon" variant="ghost" onClick={addFile}>
          <Plus className="w-4 h-4" />
        </Button>
        <span className="flex-1 text-sm truncate">{activeFile.name}</span>
        <Button size="icon" variant="ghost" onClick={saveFile}>
          <SaveIcon className={cn("w-4 h-4", activeFile.dirty && "text-yellow-500")} />
        </Button>
        <Button size="icon" onClick={run} disabled={isRunning}>
          <Play className="w-4 h-4" />
        </Button>
      </div>

      <PanelGroup direction="horizontal" className="flex-1">
        <Panel defaultSize={18} minSize={10} className="border-r bg-muted/10">
          <div className="font-mono text-xs p-2">EXPLORER</div>
          {files.map((f) => (
            <div
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={cn("px-2 py-1 text-sm cursor-pointer", f.id === activeId && "bg-accent")}
            >
              <Files className="w-3 h-3 inline-block mr-1" /> {f.name}
            </div>
          ))}
        </Panel>
        <PanelResizeHandle className="w-2 bg-border" />
        <Panel>
          <PanelGroup direction="vertical" className="h-full">
            <Panel defaultSize={70} minSize={30}>
              <Editor
                beforeMount={beforeMount}
                onMount={(editor) => (monacoRef.current = editor)}
                theme="vscode-dark"
                language={activeFile.lang}
                value={activeFile.code}
                onChange={(v) => updateCode(v || "")}
                options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
                height="100%"
              />
            </Panel>
            <PanelResizeHandle className="h-2 bg-border" />
            <Panel minSize={20} className="bg-black text-white text-xs">
              <div ref={xtermEl} className="h-full" />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};
