// import { useState } from 'react'
import Chatbot, { ChatBot} from "react-chatbot-kit"
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import 'react-chatbot-kit/build/main.css';
import  styles from "./Chat.module.css";

function Chat(){
    return(
        <div className="Chat" style={styles}>
          <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider}/>
        </div>

    );
}



export default Chat