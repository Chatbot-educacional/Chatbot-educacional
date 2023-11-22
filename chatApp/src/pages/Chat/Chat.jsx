import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './chatbot/config';
import config1 from './chatbot/config1';
import config2 from './chatbot/config2';
import MessageParser from './chatbot/MessageParser.jsx';
import ActionProvider from './chatbot/ActionProvider.jsx';
import ActionProvider1 from './chatbot/ActionProvider1.jsx';
import ActionProvider2 from './chatbot/ActionProvider2.jsx';
import './main.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';

const SelectTopic = ({ onSelectTopic }) => {
  const handleTopicSelect = (topic) => {
    onSelectTopic(topic);
  };

  return (
    <div className="select-topic-container">
      <h2>Selecione um tópico</h2>
      <button onClick={() => handleTopicSelect('Conteúdos de vetores')}>Conteúdos de vetores</button>
      <button onClick={() => handleTopicSelect('Conteúdos de funções')}>Conteúdos de funções</button>
    </div>
  );
};

function Chat() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="div-container-chat">
      {!selectedTopic ? (
        <SelectTopic onSelectTopic={handleTopicSelect} />
      ) : (
        <>
          <Link className="startbutton2" to="/chat">
            <p>+ Novo Chat</p>
          </Link>
          <NavLink className="startbutton2" to="/home">
            Sair
          </NavLink>
        </>
      )}
      {selectedTopic === 'Conteúdos de vetores' && (
        <Chatbot
          config={config1}
          messageParser={MessageParser}
          actionProvider={ActionProvider1}
          headerText={`CoderBot - ${selectedTopic}`}
        />
      )}
      {selectedTopic === 'Conteúdos de funções' && (
        <Chatbot
          config={config2}
          messageParser={MessageParser}
          actionProvider={ActionProvider2}
          headerText={`CoderBot - ${selectedTopic}`}
          disableScrollToBottom
        />
      )}
    </div>
  );
}

export default Chat;
