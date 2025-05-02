import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { invoke } from '@tauri-apps/api/core';
import { toast } from '@/components/ui/use-toast';

export function FileSystemDemo() {
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState('');
  const [filePath, setFilePath] = useState('');

  const handleCreateFile = async () => {
    try {
      const path = await invoke('create_example_file', { content });
      setFilePath(path as string);
      toast({
        title: 'File Created',
        description: `File created at ${path}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  const handleReadFile = async () => {
    try {
      const content = await invoke('read_example_file');
      setSavedContent(content as string);
    } catch (error) {
      toast({
        title: 'Error',
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>File System Demo</CardTitle>
        <CardDescription>
          Demonstrating Tauri's file system capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">File Content</label>
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content to save to a file"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleCreateFile}>
            Create File
          </Button>
          <Button onClick={handleReadFile}>
            Read File
          </Button>
        </div>

        {filePath && (
          <div className="p-2 bg-muted rounded-md">
            <p className="text-sm font-mono break-all">File path: {filePath}</p>
          </div>
        )}

        {savedContent && (
          <div className="p-2 bg-muted rounded-md">
            <p className="text-sm font-mono">Content: {savedContent}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
