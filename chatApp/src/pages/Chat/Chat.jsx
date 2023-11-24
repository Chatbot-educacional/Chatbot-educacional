// import { useState } from 'react'
import React, { useEffect, useRef } from 'react';
import Chatbot from "react-chatbot-kit"
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser.jsx";
import ActionProvider from "./chatbot/ActionProvider.jsx";
import './main.css';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
// import { FaArrowRight } from 'react-icons/fa';
// import 'react-chatbot-kit/build/main.css';

function Chat(){
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [clicked, setClicked] = React.useState(false);
  const chatContainerRef = useRef(null);
  const shouldScrollRef = useRef(true);

  // const handleClick = () => {
  //     setClicked(!clicked);
  // }

  // useEffect(() => {
  //   const chatContainer = chatContainerRef.current;

  //   const scrollChatToBottom = () => {
  //     chatContainer.scrollTop = chatContainer.scrollHeight;
  //   };

  //   const handleScroll = () => {
  //     const { scrollTop, scrollHeight, clientHeight } = chatContainer;
  //     const atBottom = scrollHeight - scrollTop === clientHeight;
  //     if (atBottom) {
  //       shouldScrollRef.current = true;
  //     } else {
  //       shouldScrollRef.current = false;
  //     }
  //   };

  //   const checkOverflowAndScroll = () => {
  //     if (shouldScrollRef.current) {
  //       scrollChatToBottom();
  //     }
  //   };

  //   if (chatContainer) {
  //     chatContainer.addEventListener('scroll', handleScroll);

  //     const intervalId = setInterval(checkOverflowAndScroll, 100);

  //     return () => {
  //       clearInterval(intervalId);
  //       chatContainer.removeEventListener('scroll', handleScroll);
  //     };
  //   }
  // }, []);

    return(
        <div className="div-container-chat">
          <div className="div-lateral-bar">
            {/* <h1>CoderBOT</h1> */}
            {/* <span className="">Olá,<br/>{user.displayName}</span> */}
            {/* <Link className="startbutton2" to="/chat"><p>+ Novo Chat</p></Link>
            <NavLink className="startbutton2" to="/home">Sair</NavLink> */}
          </div>
          <div className="div-chat-main-container" ref={chatContainerRef}>
            <div className="chat-header">
              {/* <span>Olá, {user.displayName}.</span> */}
              <span>CoderBot <span className="span-version">1.0</span></span>
              {/* <NavLink className="button2" to="/home">Sair</NavLink> */}
            </div>
            <div className="div-chat">
              <Chatbot 
                config={config} 
                messageParser={MessageParser} 
                actionProvider={ActionProvider}
                headerText="CoderBOT"
              />
            </div>
          </div>
          <div className="div-lateral-bar">
            {/* <h1>CoderBOT</h1> */}
            {/* <span className="">Olá,<br/>{user.displayName}</span> */}
            {/* <Link className="startbutton2" to="/chat"><p>+ Novo Chat</p></Link>
            <NavLink className="startbutton2" to="/home">Sair</NavLink> */}
          </div>
        </div>
    );
}

export default Chat