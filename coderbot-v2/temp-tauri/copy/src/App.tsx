import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { openWindow, openExternalUrl, openAppWindow } from "./utils/window";
import "./App.css";

// Componente reutilizável para abrir janelas
export function WindowOpener() {
  const handleOpenInternalWindow = () => openAppWindow("Nova Janela");
  const handleOpenExternalWindow = () => openExternalUrl("tauri.app", "Tauri Docs");
  const handleOpenGitHub = () => openExternalUrl("github.com/tauri-apps/tauri", "GitHub Tauri");
  
  return (
    <div className="window-opener">
      <h2>Abrir Janelas</h2>
      <div className="buttons">
        <button onClick={handleOpenInternalWindow}>
          Nova Janela App
        </button>
        <button onClick={handleOpenExternalWindow}>
          Abrir Site Tauri
        </button>
        <button onClick={handleOpenGitHub}>
          GitHub Tauri
        </button>
      </div>
    </div>
  );
}

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  const handleOpenNewWindow = () => openAppWindow("Nova Janela Demo");
  const handleOpenExternalUrl = () => openExternalUrl("github.com", "GitHub");

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>

      {/* Seção de demonstração para abrir novas janelas */}
      <div className="row" style={{ marginTop: "2rem" }}>
        <h2>Demonstração: Abrir Novas Janelas</h2>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button onClick={handleOpenNewWindow}>
            Abrir Nova Janela App
          </button>
          <button onClick={handleOpenExternalUrl}>
            Abrir GitHub
          </button>
        </div>
      </div>

      {/* Usar o componente reutilizável */}
      <div className="row" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <h2>Componente Reutilizável</h2>
        <WindowOpener />
      </div>
    </main>
  );
}

export default App;
