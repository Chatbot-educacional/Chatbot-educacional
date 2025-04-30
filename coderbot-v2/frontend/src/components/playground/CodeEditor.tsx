// src/components/CodeEditor.tsx
// Modern Code Editor component – polished UI/UX, typed, responsive
// ----------------------------------------------------------------------
// • Monaco Editor with VS‑Dark theme
// • XTerm.js console for coloured interactive output
// • Language + code persisted in localStorage (last session restore)
// • Ctrl + Enter & ⌘ + Enter keyboard shortcut to Run
// • Toast feedback on success / error (react‑hot‑toast)
// • Loading indicator on run
// • Safe Base‑64 decoding & graceful error handling
// • Fully accessible (aria‑labels, button titles, focus rings)
// ----------------------------------------------------------------------

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Play, RefreshCw, Save, Settings, Trash2, Copy } from "lucide-react"; // Added Trash2, Copy
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels"; // Added react-resizable-panels

import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------
// Types & Constants
// ----------------------------------------------------------------------

type Language = "javascript" | "python" | "html" | "css";

const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
];

/** Map para futuros usos com Judge0 enviando o ID da linguagem. */
export const LANGUAGE_TO_ID: Record<Language, number> = {
  javascript: 63,
  python: 71,
  html: 200,
  css: 200,
};

const DEFAULT_CODE: Record<Language, string> = {
  javascript: `// JavaScript example\nconsole.log("Hello, world!");`,
  python: `# Python example\nprint("Hello, world!")`,
  html: `<!DOCTYPE html><html><body><h1>Hello, world!</h1></body></html>`,
  css: `body { font-family: sans-serif; }`,
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const LS_KEY = "code-editor-state-v1";

// ----------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------
const safeAtob = (data?: string | null) => {
  if (!data) return "";
  try {
    return atob(data);
  } catch {
    return data;
  }
};

interface StoredState {
  language: Language;
  code: string;
}

/** Persist language + code between sessions. */
const usePersistedState = () => {
  const read = (): StoredState | null => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as StoredState) : null;
    } catch {
      return null;
    }
  };
  const write = (state: StoredState) => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  };
  return { read, write };
};

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------
export const CodeEditor: React.FC = () => {
  // ─── State ───────────────────────────────────────────────────────────
  const { read, write } = usePersistedState();
  const persisted = read();
  const [language, setLanguage] = useState<Language>(
    persisted?.language ?? "javascript"
  );
  const [code, setCode] = useState<string>(
    persisted?.code ?? DEFAULT_CODE[language]
  );
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const xtermRef = useRef<XTerm>();
  const xtermElemRef = useRef<HTMLDivElement | null>(null);
  const isXtermOpenRef = useRef(false);
  const fitAddonRef = useRef<FitAddon>();           // ← novo
  const [showMinimap, setShowMinimap] = useState(false); // State for minimap setting
  const monacoRef = useRef<Parameters<OnMount>[0] | null>(null);

  // ─── Effects ─────────────────────────────────────────────────────────
  /** Create XTerm instance (but do NOT open yet) */
  useEffect(() => {
    xtermRef.current = new XTerm({
      fontFamily: "JetBrains Mono, monospace",
      theme: { 
        background: "#000",
        foreground: "#fff",
        // Add more colors for better ANSI support
        black: "#000000",
        red: "#ff0000",
        green: "#00ff00",
        yellow: "#ffff00",
        blue: "#0000ff",
        magenta: "#ff00ff",
        cyan: "#00ffff",
        white: "#ffffff"
      },
      scrollback: 1000,
      convertEol: true,
    });
  
    const fitAddon = new FitAddon();
    xtermRef.current.loadAddon(fitAddon);
    fitAddonRef.current = fitAddon;
    
    return () => {
      xtermRef.current?.dispose();
    };
  }, []);

  /** Open XTerm and fit when the output tab becomes active */
  useEffect(() => {
    if (activeTab === "output" && xtermRef.current && xtermElemRef.current) {
      if (!isXtermOpenRef.current) {
        xtermRef.current.open(xtermElemRef.current);
        isXtermOpenRef.current = true;
      }
      // Fit the terminal whenever the tab is active
      fitAddonRef.current?.fit(); 
    }
  }, [activeTab]); // Rerun when activeTab changes

  /** Persist state */
  useEffect(() => {
    write({ language, code });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, code]);

  /** Handle window resize for Monaco layout and XTerm fit */
  useEffect(() => {
    const handleResize = () => {
      // Resize Monaco editor
      monacoRef.current?.layout();
      // Resize terminal only if the output tab is active
      if (activeTab === "output") {
        fitAddonRef.current?.fit(); 
      }
    };
    window.addEventListener("resize", handleResize);
    // Initial fit after mount
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]); // Re-attach listener if activeTab changes, ensuring fit logic is correct

  /** Sync default code when language changes */
  useEffect(() => {
    if (!persisted) {
      setCode(DEFAULT_CODE[language]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // ─── Handlers ─────────────────────────────────────────────────────────
  const handleEditorMount: OnMount = (editor) => {
    monacoRef.current = editor;
    editor.focus(); // garante que o editor receba foco para digitação
  };

  const handleKeyRun = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    },
    []
  );

  const handleLanguageChange = (value: string) => {
    const lang = value as Language;
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang]);
    xtermRef.current?.clear();
  };

  const handleReset = () => {
    setCode(DEFAULT_CODE[language]);
    // Clear terminal only if it's already open
    if (isXtermOpenRef.current) {
       printToTerminal("", true); // Clear terminal content
    }
  };

  /** Appends a message to the terminal */
  const printToTerminal = useCallback((msg: string, clearFirst = false) => {
    if (!xtermRef.current) return;

    if (clearFirst) {
      xtermRef.current.clear();
    }

    // Use write instead of writeln to handle ANSI codes spanning multiple lines better
    // Replace newlines with \r\n for proper terminal display
    xtermRef.current.write(msg.replace(/\r?\n/g, "\r\n")); 
    
    xtermRef.current.scrollToBottom();
  }, []); // No dependencies needed as it only uses refs

  /** Clears the terminal content */
  const handleClearTerminal = useCallback(() => {
    if (xtermRef.current) {
      printToTerminal("", true); // Use printToTerminal to clear
    }
  }, [printToTerminal]);

  /** Copies terminal content to clipboard */
  const handleCopyTerminal = useCallback(async () => {
    if (xtermRef.current) {
      try {
        const content = await xtermRef.current.textarea.value; // Access internal textarea content
        // A more robust way might involve selection API if needed, but this often works
        // For complex content/selection, xterm.js selection manager might be needed.
        if (content) {
          await navigator.clipboard.writeText(content);
          toast.success("Console output copied!");
        } else {
          toast("Console is empty.", { icon: '🤷' });
        }
      } catch (err) {
        console.error("Failed to copy terminal content:", err);
        toast.error("Could not copy output.");
      }
    }
  }, []);


  /** Executes the code via the API */
  const executeCode = useCallback(async (lang: Language, codeToRun: string) => {
    const response = await fetch(`${API_URL}/judge/executar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: lang, code: codeToRun }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Request failed with status ${response.status}`);
    }

    return await response.json();
  }, []); // No dependencies, API_URL is constant

  const handleRun = useCallback(async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setActiveTab("output");

    // Ensure terminal is ready before printing
    await new Promise((res) => setTimeout(res, 50)); 

    // Ensure terminal is open and fitted
    if (xtermRef.current && xtermElemRef.current && !isXtermOpenRef.current) {
        xtermRef.current.open(xtermElemRef.current);
        isXtermOpenRef.current = true;
    }
    fitAddonRef.current?.fit(); // Fit on run

    printToTerminal("🚀 Running code...\r\n", true); // Clear terminal and print status

    try {
      const { stdout, stderr, compile_output, message, time, memory } = await executeCode(language, code);

      // Process and print results
      const outStd = safeAtob(stdout);
      const outErr = safeAtob(stderr);
      const outComp = safeAtob(compile_output);
      const outMsg = safeAtob(message);

      if (outErr) printToTerminal(`\r\n\x1b[31mError:\x1b[0m\r\n${outErr}`);
      if (outComp) printToTerminal(`\r\n\x1b[33mCompiler Output:\x1b[0m\r\n${outComp}`);
      if (outStd) printToTerminal(`\r\n\x1b[32mOutput:\x1b[0m\r\n${outStd}`);
      if (outMsg) printToTerminal(`\r\n\x1b[36mMessage:\x1b[0m\r\n${outMsg}`);
      
      if (!outStd && !outErr && !outComp && !outMsg) {
         printToTerminal("\r\n(No output)");
      }

      // Print execution stats
      if (time || memory) {
        printToTerminal(`\r\n\r\n\x1b[90mExecution Stats:\x1b[0m`);
        printToTerminal(`\r\nTime: ${time ?? "‑"} s | Memory: ${memory ?? "‑"} KB`);
      }

      toast.success("Execution completed");

    } catch (err: any) {
      printToTerminal(`\r\n\x1b[31mExecution Error: ${err.message}\x1b[0m`);
      toast.error("Failed to execute code");
    } finally {
      setIsRunning(false);
      // Ensure the final output is scrolled into view
      xtermRef.current?.scrollToBottom(); 
    }
  }, [isRunning, language, code, printToTerminal, executeCode]); // Add dependencies

  const toggleMinimap = () => {
    setShowMinimap(prev => !prev);
    // We'll update the editor option when rendering based on showMinimap state
  };


  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col bg-code dark:bg-code" onKeyDown={handleKeyRun}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-muted/40 p-3">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-48" aria-label="Selecionar linguagem">
            <SelectValue placeholder="Linguagem" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleRun}
          disabled={isRunning}
          className="gap-2"
          title="Executar (Ctrl + Enter)"
        >
          <Play className="h-4 w-4" />
          {isRunning ? "Executando…" : "Executar"}
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="gap-2"
          title="Reiniciar código"
        >
          <RefreshCw className="h-4 w-4" />
          Reiniciar
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" title="Salvar (em breve)">
          <Save className="h-4 w-4" />
        </Button>
        {/* Basic Settings Toggle Example */}
        <Button variant="ghost" size="icon" title="Toggle Minimap" onClick={toggleMinimap}>
          <Settings className={cn("h-4 w-4", showMinimap && "text-accent-foreground")} />
        </Button>
      </div>

      {/* Use PanelGroup for resizable layout */}
      <PanelGroup direction="vertical" className="flex-1">
        <Panel defaultSize={60} minSize={20}> {/* Editor Panel */}
          <Editor
            onMount={handleEditorMount}
            height="100%" // Editor takes full height of its panel
            language={language}
            value={code}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
            options={{
              readOnly: false,
              minimap: { enabled: showMinimap }, // Use state for minimap
              fontSize: 14,
              wordWrap: "on",
              automaticLayout: true, // Still useful within the panel
              padding: { top: 16 },
              smoothScrolling: true,
            }}
          />
        </Panel>
        <PanelResizeHandle className="h-2 bg-border data-[resize-handle-state=drag]:bg-primary transition-colors" />
        <Panel defaultSize={40} minSize={10} className="flex flex-col"> {/* Terminal Panel */}
          {/* Terminal Tabs Header */}
          <div className="flex items-center border-b border-t border-border bg-muted/40 px-2">
             <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                <TabsList className="bg-transparent border-none p-0 h-10">
                  {/* Keep TabsTrigger simple, maybe adjust styling if needed */}
                  <TabsTrigger value="output" className="py-2 px-4 data-[state=active]:bg-background data-[state=active]:shadow-none">
                    Console
                  </TabsTrigger>
                  {/* Add other tabs here if needed in the future */}
                </TabsList>
             </Tabs>
             {/* Terminal Action Buttons */}
             <div className="flex items-center gap-1 mr-2">
                <Button variant="ghost" size="icon" title="Copy Output" onClick={handleCopyTerminal}>
                    <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Clear Console" onClick={handleClearTerminal}>
                    <Trash2 className="h-4 w-4" />
                </Button>
             </div>
          </div>
          {/* Terminal Content Area */}
          <div className="flex-1 overflow-hidden bg-black"> {/* Ensure this container fills the panel */}
             {/* The ref element needs to be directly inside the container that should hold the terminal */}
             <div ref={xtermElemRef} className="h-full w-full" />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};
