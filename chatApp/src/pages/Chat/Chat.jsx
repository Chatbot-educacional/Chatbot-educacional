// import { useState } from 'react'
import React from "react";
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

  // const handleClick = () => {
  //     setClicked(!clicked);
  // }

    return(
        <div className="div-container-chat">
          <div className="div-lateral-bar">
            {/* <h1>CoderBOT</h1> */}
            {/* <span className="">Olá,<br/>{user.displayName}</span> */}
            <Link className="startbutton2" to="/chat"><p>+ Novo Chat</p></Link>
            <NavLink className="startbutton2" to="/home">Sair</NavLink>
          </div>
          <Chatbot 
            config={config} 
            messageParser={MessageParser} 
            actionProvider={ActionProvider}
            headerText="CoderBOT"
          />
        </div>
    );
}

export default Chat