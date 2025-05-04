import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor as CodeEditorComponent } from "@/components/playground/CodeEditor";
import { FileSystemDemo } from "@/components/filesystem/FileSystemDemo";
import * as Accordion from "@radix-ui/react-accordion";
import { Folder as FolderIcon, FolderOpen as FolderOpenIcon, File as FileIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

const CodeEditor = () => {
  const [selectedId, setSelectedId] = useState("3");

  return (
    <Tabs defaultValue="editor" className="w-full h-full flex flex-col">
      <TabsList className="mb-4">
        <TabsTrigger value="editor">Code Editor</TabsTrigger>
        <TabsTrigger value="filesystem">File System Demo</TabsTrigger>
      </TabsList>
      <TabsContent value="editor" className="flex-grow h-0 flex flex-row border rounded-md overflow-hidden bg-muted/10">
        {/* Modern Explorer Sidebar */}
        <div className="w-64 min-w-[180px] max-w-xs border-r bg-background p-2 overflow-auto">
          <div className="font-mono text-xs mb-2">EXPLORER</div>
          <Explorer data={explorerData} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        {/* Editor */}
        <div className="flex-1 h-full">
          <CodeEditorComponent />
        </div>
      </TabsContent>
      <TabsContent value="filesystem" className="flex-grow p-4">
        <FileSystemDemo />
      </TabsContent>
    </Tabs>
  );
};

export default CodeEditor;
