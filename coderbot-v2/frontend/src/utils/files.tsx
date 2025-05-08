// src/utils/files.ts
import { readDir, readTextFile, writeTextFile, BaseDirectory, createDir } from "@tauri-apps/plugin-fs";
import { workspaceDir } from "./tauri";

export async function listFiles() {
  const dir = await workspaceDir();
  await createDir(dir, { recursive: true });
  const entries = await readDir(dir, { recursive: false });
  return entries.filter(e => !e.children).map(e => e.name!) as string[];
}

export async function loadFile(name: string) {
  const dir = await workspaceDir();
  return readTextFile(`${dir}/${name}`);
}

export async function saveFile(name: string, content: string) {
  const dir = await workspaceDir();
  await writeTextFile(`${dir}/${name}`, content);
}
