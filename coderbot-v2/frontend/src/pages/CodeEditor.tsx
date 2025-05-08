import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSystemDemo } from "@/components/filesystem/FileSystemDemo";
import * as Accordion from "@radix-ui/react-accordion";
import { Folder as FolderIcon, FolderOpen as FolderOpenIcon, File as FileIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { invoke } from "@tauri-apps/api/core";

const explorerData = [
  {
    id: "1",
    name: "src",
    children: [
      {
        id: "2",
        name: "app",
        children: [
          { id: "3", name: "layout.tsx" },
          { id: "4", name: "page.tsx" },
        ],
      },
      {
        id: "5",
        name: "components",
        children: [
          { id: "6", name: "header.tsx" },
          { id: "7", name: "footer.tsx" },
        ],
      },
      {
        id: "8",
        name: "lib",
        children: [
          { id: "9", name: "utils.ts" },
        ],
      },
    ],
  },
  { id: "10", name: "README.md" },
];

function Explorer({ data, selectedId, onSelect }) {
  return (
    <Accordion.Root type="multiple" className="flex flex-col gap-1">
      {data.map((item) =>
        item.children ? (
          <Accordion.Item key={item.id} value={item.id} className="border-none">
            <Accordion.Header className="flex">
              <Accordion.Trigger className={cn(
                "flex items-center gap-1 w-full px-2 py-1 rounded-md text-left transition-colors",
                "hover:bg-muted focus:bg-muted group"
              )}>
                <ChevronRight className="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-90" />
                <FolderIcon className="size-4 text-sky-500" />
                <span>{item.name}</span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pl-6">
              <Explorer data={item.children} selectedId={selectedId} onSelect={onSelect} />
            </Accordion.Content>
          </Accordion.Item>
        ) : (
          <button
            key={item.id}
            className={cn(
              "flex items-center gap-2 w-full px-2 py-1 rounded-md transition-colors",
              selectedId === item.id ? "bg-purple-200 text-purple-900 font-bold" : "hover:bg-muted"
            )}
            onClick={() => onSelect(item.id)}
          >
            <FileIcon className="size-4 text-gray-900" />
            <span>{item.name}</span>
          </button>
        )
      )}
    </Accordion.Root>
  );
}

const CODE_SERVER_URL = "http://localhost:8787"; // ajuste se necessário

const CodeEditor = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Handler para interceptar window.open e links target=_blank
    function handleMessage(event: MessageEvent) {
      // Só aceite mensagens do VS Code Web
      if (!event.data || typeof event.data !== "object") return;
      // VS Code Web pode enviar mensagens de navegação
      if (event.data.type === "vscode:openExternal" && event.data.url) {
        invoke("plugin:opener|open", { path: event.data.url });
      }
    }

    window.addEventListener("message", handleMessage);

    // Injetar script no iframe para interceptar window.open e links target=_blank
    function injectScript() {
      if (!iframe.contentWindow) return;
      iframe.contentWindow.postMessage(
        { type: "inject-external-link-handler" },
        "*"
      );
    }
    iframe.addEventListener("load", injectScript);

    return () => {
      window.removeEventListener("message", handleMessage);
      iframe.removeEventListener("load", injectScript);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={CODE_SERVER_URL}
      title="VS Code code-server"
      className="w-full h-full border-0 flex-1"
    />
  );
};

export default CodeEditor;
