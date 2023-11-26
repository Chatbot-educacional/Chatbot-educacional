import React, { useEffect, useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import config1 from "./chatbot/config1";
import config2 from "./chatbot/config2";
import MessageParser from "./chatbot/MessageParser.jsx";
import ActionProvider from "./chatbot/ActionProvider.jsx";
import ActionProvider1 from "./chatbot/ActionProvider1.jsx";
import ActionProvider2 from "./chatbot/ActionProvider2.jsx";
import "./main.css";
import { Link } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

const SelectTopic = ({ onSelectTopic }) => {
  const handleTopicSelect = (topic) => {
    onSelectTopic(topic);
  };

  return (
    <div className="select-topic-container">
      <h2>Selecione a turma a qual você pertence:</h2>
      <button onClick={() => handleTopicSelect("Conteúdos de vetores")}>
        Turma da Professora Brenda
      </button>
      <button onClick={() => handleTopicSelect("Conteúdos de funções")}>
        Turma da Professora Raquel
      </button>
    </div>
  );
};

function Chat() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    setSelectedTopic(localStorage.getItem("turmaEscolhida"));
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    localStorage.setItem("turmaEscolhida", topic);
  };

  return (
    <div className="div-container-chat">
      {!selectedTopic ? (
        <SelectTopic onSelectTopic={handleTopicSelect} />
      ) : (
        <div className="div-lateral-bar">{/* Seu conteúdo aqui */}</div>
      )}
      {selectedTopic === "Conteúdos de vetores" && (
        <>
          <div className="div-chat-main-container">
            <div className="chat-header">
              <span>
                CoderBot <span className="span-version">1.0</span>
              </span>
              {/* <NavLink className="button2" to="/home">Sair</NavLink> */}
            </div>
              <Chatbot
                config={config1}
                messageParser={MessageParser}
                actionProvider={ActionProvider1}
                headerText="CoderBOT"
              />
          </div>
          <div className="div-lateral-bar">{/* Seu conteúdo aqui */}</div>
        </>
      )}
      {selectedTopic === "Conteúdos de funções" && (
        <>
          <div className="div-chat-main-container">
            <div className="chat-header">
              {/* <span>Olá, {user.displayName}.</span> */}
              <span>
                CoderBot <span className="span-version">1.0</span>
              </span>
              {/* <NavLink className="button2" to="/home">Sair</NavLink> */}
            </div>
              <Chatbot
                config={config2}
                messageParser={MessageParser}
                actionProvider={ActionProvider2}
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
