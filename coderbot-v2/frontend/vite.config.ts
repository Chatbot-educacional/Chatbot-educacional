import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { tauri } from "vite-plugin-tauri";

export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
  plugins: [
    react(),
    mode !== 'development' && tauri(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "magicui": path.resolve(__dirname, "./src/components/magicui"),
      "magicui/*": path.resolve(__dirname, "./src/components/magicui/*"),
    },
  },
}));
