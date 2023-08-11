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
          <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider}/>
        </div>
    );
}

export default Chat