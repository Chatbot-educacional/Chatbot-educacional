import { CodeEditor as CodeEditorComponent } from "@/components/playground/CodeEditor";
import { FileSystemDemo } from "@/components/filesystem/FileSystemDemo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CodeEditor = () => {
  return (
    <Tabs defaultValue="editor" className="w-full h-full flex flex-col">
      <TabsList className="mb-4">
        <TabsTrigger value="editor">Code Editor</TabsTrigger>
        <TabsTrigger value="filesystem">File System Demo</TabsTrigger>
      </TabsList>
      
      <TabsContent value="editor" className="flex-grow">
        <CodeEditorComponent />
      </TabsContent>
      
      <TabsContent value="filesystem" className="flex-grow p-4">
        <FileSystemDemo />
      </TabsContent>
    </Tabs>
  );
};

export default CodeEditor;
