// import { useState } from 'react'
import Chatbot from "react-chatbot-kit"
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import './main.css';
// import 'react-chatbot-kit/build/main.css';

function Chat(){
    return(
        <div className="div-container-chat">
          <div className="left-side">
            <h1>WillBOT</h1>
            <button>+ Novo chatbot</button>
          </div>
          <div className="chat-bot">
            <Chatbot 
              config={config} 
              messageParser={MessageParser} 
              actionProvider={ActionProvider}
              headerText="ChatBot Educacional"
              placeholderText="Digite sua opção..."
            />
          </div>
        </div>
    );
}

export default Chat