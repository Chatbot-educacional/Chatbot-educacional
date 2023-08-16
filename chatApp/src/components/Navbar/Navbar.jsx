import { NavLink } from "react-router-dom"

import { useAuthentication } from "../../hooks/useAuthentication";

import { useAuthValue } from "../../context/AuthContext";

import styles from './Navbar.module.css';

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            Chat <span>Bot</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
            </li>
            {user && (
                <>
                    <li>
                    <NavLink to="/chat" className={({isActive}) => (isActive ? styles.active : '')}>Chat</NavLink>
                    </li>
                </>
            )}
            <li>
                <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>Sobre</NavLink>
            </li>
            <li>
                <NavLink to="/contact" className={({isActive}) => (isActive ? styles.active : '')}>Contato</NavLink>
            </li>
        </ul>
        <ul className={styles.links_list_right}>
        {!user && (
            <>
                <li>
                    <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>Entrar</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>Cadastrar</NavLink>
                </li>
            </>
        )}
            {user && (
                <li>
                    <NavLink onClick={logout} className={({isActive}) => (isActive ? styles.active : '')}>Sair</NavLink>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar