import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Button,
} from "@chatscope/chat-ui-kit-react";
import { FaBars } from 'react-icons/fa';
import Bar from './Bar';

function App() {
  const [showButtons, setShowButtons] = useState(true);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);

    if (message === "Bom dia") {
    
    }

    // Conditionally hide buttons 2 and 3 after clicking button 1
    if (message === "Opção 1") {
      setShowButtons(false);
      setTimeout(() => {
        const systemMessage = {
          message: "Hello, I'm ChatGPT! Ask me anything!",
          sentTime: "just now",
          sender: "ChatGPT",
        };

        const updatedMessages = [...newMessages, systemMessage];
        setMessages(updatedMessages);
        setIsTyping(false);
      }, 1000);
    } else {
      setShowButtons(true); // Show buttons 2 and 3 for other messages
    }
  };

  return (
    <div className="App">
      <div style={{ width: "600px", height: "400px", margin: "0 auto", padding: "2rem", textAlign: "center", }}>
        <MainContainer style={{ position: "relative", }}>
          {/* Move the chatContainer to the bottom */}
          <div className='chatContainer' style={{ height: "300px", overflowY: "auto", position: "absolute", bottom: "90px", left: 0, right: 0, }}>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
              >
                {messages.map((message, i) => {
                  console.log(message);
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
            </ChatContainer>
          </div>

          {/* Position the button relative to the parent container */}
          <div className='btnEnviar' style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: showButtons ? "flex" : "none" }}>
            {/* Set the width of the buttons using the "width" property */}
            <Button border style={{ width: "70px" }} onClick={() => handleSend("Opção 1")}>Opção 1</Button>
            {showButtons && (
              <>
                <Button border style={{ width: "70px" }} onClick={() => handleSend("Opção 2")}>Opção 2</Button>
                <Button border style={{ width: "70px" }} onClick={() => handleSend("Opção 3")}>Opção 3</Button>
              </>
            )}
          </div>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
