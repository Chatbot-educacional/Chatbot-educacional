// import { useState } from 'react'
import Chatbot from "react-chatbot-kit"
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser.jsx";
import ActionProvider from "./chatbot/ActionProvider.jsx";
import './main.css';
// import 'react-chatbot-kit/build/main.css';

function Chat(){
    return(
        <div className="div-container-chat">
          <Chatbot 
            config={config} 
            messageParser={MessageParser} 
            actionProvider={ActionProvider}
            headerText="ChatBot Educacional"
            placeholderText="Digite sua opção..."
          />
        </div>
    );
}

export default Chat