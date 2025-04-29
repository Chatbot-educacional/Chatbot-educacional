import React from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";          // ← obrigatório!

const Whiteboard: React.FC = () => (
  <div className="flex flex-col w-full h-screen bg-background">
    <h2 className="text-2xl font-bold mb-4 self-center">Quadro</h2>

    {/* a <div> extra evita que o Excalidraw “colapse” se o pai usar flex   */}
    <div className="flex-1">
      <Excalidraw />
    </div>
  </div>
);

export default Whiteboard;
