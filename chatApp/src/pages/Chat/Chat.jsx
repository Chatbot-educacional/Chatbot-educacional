import React, { useEffect, useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser.jsx";
import ActionProvider from "./chatbot/ActionProvider.jsx";
import "./main.css";

const SelectTopic = ({ onSelectTopic }) => {
  const handleTopicSelect = (topic) => {
    onSelectTopic(topic);
  };

  return (
    <div className="select-topic-container">
      {/*Configura os botões de linguagem */}
      <h2>Selecione a turma a qual você pertence:</h2>
      <button onClick={() => handleTopicSelect("Linguagem C")}>
        Linguagem C
      </button>
      <button onClick={() => handleTopicSelect("Linguagem Java")}>
        Linguagem Java
      </button>
      <button onClick={() => handleTopicSelect("Linguagem Python")}>
        Linguagem Python
      </button>
    </div>
  );
};

function Chat() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  /* usado para manter o usuário na sessão do experimento quando era por professor
  useEffect(() => {
    //
    //setSelectedTopic(localStorage.getItem("turmaEscolhida"));
  }, []);*/

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    //usado para setar a linguagem e capturar no ActionProvider (adaptação)
    localStorage.setItem("conteudo", topic);
  };

  return (
    <div className="div-container-chat">
      {!selectedTopic ? (
        <SelectTopic onSelectTopic={handleTopicSelect} />
      ) : (
        <div className="div-lateral-bar">{/* Seu conteúdo aqui */}</div>
      )}
      {selectedTopic === "Linguagem C" && (
        <>
          <div className="div-chat-main-container">
            <div className="chat-header">
              <span>
                CoderBot <span className="span-version">1.0</span>
              </span>
              <span> - {selectedTopic}</span>
              {/* <NavLink className="button2" to="/home">Sair</NavLink> */}
            </div>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              headerText="CoderBOT"
            />
          </div>
          <div className="div-lateral-bar">{/* Seu conteúdo aqui */}</div>
        </>
      )}
      {selectedTopic === "Linguagem Java" && (
        <>
          <div className="div-chat-main-container">
            <div className="chat-header">
              {/* <span>Olá, {user.displayName}.</span> */}
              <span>
                CoderBot <span className="span-version">1.0</span>
              </span>
              <span> - {selectedTopic}</span>
              {/* <NavLink className="button2" to="/home">Sair</NavLink> */}
            </div>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              headerText="CoderBOT"
            />
          </div>
          <div className="div-lateral-bar">{/* Seu conteúdo aqui */}</div>
        </>
      )}
      {selectedTopic === "Linguagem Python" && (
        <>
          <div className="div-chat-main-container">
            <div className="chat-header">
              {/* <span>Olá, {user.displayName}.</span> */}
              <span>
                CoderBot <span className="span-version">1.0</span>
              </span>
              <span> - {selectedTopic}</span>
              {/* <NavLink className="button2" to="/home">Sair</NavLink> */}
            </div>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              headerText="CoderBOT"
            />
          </div>
          <div className="div-lateral-bar">{/* Seu conteúdo aqui */}</div>
        </>
      )}
    </div>
  );
}

export default Chat;
