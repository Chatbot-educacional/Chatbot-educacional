// CSS
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from '@firebase/auth';

// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// context
import { AuthProvider } from './context/AuthContext';

// pages 
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Chat from './pages/Chat/Chat';
import CreateExample from './pages/CreateExample/CreateExample';
import Researchers from './pages/Researchers/Researchers';
import FooterConditional from './components/FooterConditional';
import HeaderChat from './components/HeaderChat';
import PacmanLoader from "react-spinners/PacmanLoader";
import PageError404 from './pages/404/PageError404';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [clickLocal, setClickLocal] = useState([]);
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setClickCount(0);
    })
  }, [auth]);

  useEffect(() => {
    // Adiciona um ouvinte de eventos para capturar todos os cliques
    const handleClick = (event) => {
      setClickCount((prevClickCount) => prevClickCount + 1);
      clickLocal.push(event.target.localName);
    };
    document.addEventListener('click', handleClick);

    // Remove o ouvinte de eventos ao desmontar o componente
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (loadingUser) {
    return (
      <div className="loader">
        <PacmanLoader color="#AFABFC" size={50} />
      </div>
    )
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <Router>
          <HeaderChat clicks={clickCount} local={clickLocal} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
            <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
            <Route path="/create-example" element={user ? <CreateExample /> : <Navigate to="/login" />} />
            <Route path="/researchers" element={<Researchers />} />

            <Route index element={<Navigate to="/home" />} />

            <Route path='*' element={<PageError404 />} />
          </Routes>
          <FooterConditional />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App
