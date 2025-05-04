import React, { useState } from "react";

export type Language = "javascript" | "python";

export interface FileNode {
  id: string;
  name: string;
  lang: Language;
  code: string;
  dirty: boolean;
}

export interface FileTreeNode {
  id: string;
  name: string;
  type: "file" | "directory";
  children?: FileTreeNode[];
  fileId?: string; // link to FileNode.id
}

export function buildFileTree(files: FileNode[]): FileTreeNode[] {
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

export const FileTree: React.FC<{
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
              className={
                "cursor-pointer pl-5 block py-0.5 rounded hover:bg-purple-100" +
                (node.fileId === activeId ? " bg-purple-200 font-bold" : "")
              }
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