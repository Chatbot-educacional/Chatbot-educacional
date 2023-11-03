import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

function HeaderChat() {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  if (isChatPage) {
    const divStyle = {
      transform: 'translateY(-100%)',
      transition: 'transform 0.3s ease-in-out',
    };
  
    return (
      <div style={divStyle}>
      </div>
    );
  }

  return <Navbar />;
}

export default HeaderChat;
