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
import Researchers from './pages/Researchers/Researchers';
import FooterConditional from './components/FooterConditional';
import { useTheme } from './hooks/useTheme';
import { MdDarkMode } from 'react-icons/md';
import { BsFillLightbulbFill } from 'react-icons/bs';

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

  const { theme, setTheme} = useTheme();

  const button = (
    <div>
      {theme === "light" ? (
        <MdDarkMode 
          size={30} 
          className='cursor-pointer text-white' 
          onClick={()=>setTheme("dark")}
        />
      ) : (
        <BsFillLightbulbFill
          size={25}
          className='cursor-pointer text-white'
          onClick={()=>setTheme("light")}
        />
      )}
    </div>
  );
  

  return (
    <div className="dark:bg-[#02050c] dark:text-white">
      <AuthProvider value={{ user }}>
        <Router>
        <Navbar />
          <div className='min-h-70 mb-5'> 
            <Routes>
              <Route path="/" element={<Home button={button} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
              <Route path="/researchers" element={ <Researchers /> } />  
            </Routes>
          </div>
          <FooterConditional />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App
