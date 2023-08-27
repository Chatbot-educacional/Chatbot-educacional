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
import FooterConditional from './components/FooterConditional';

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth])

  if (loadingUser) {
    return <div>Carregando...</div>
  }
  
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <Router>
        <Navbar />
          <div className="container"> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
              <Route path="/create-example" element={user ? <CreateExample /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <FooterConditional />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App
