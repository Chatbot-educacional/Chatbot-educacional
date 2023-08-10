import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

function FooterConditional() {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  if (isChatPage) {
    return null;
  }

  return <Footer />;
}

export default FooterConditional;
