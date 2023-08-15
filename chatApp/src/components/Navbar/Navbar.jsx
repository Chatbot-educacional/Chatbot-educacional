import { NavLink } from "react-router-dom"
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            Chat <span>Bot</span>
        </NavLink>
        <div className={styles.menu_toggle_on}>
            <div className={styles.menu_toggle}>
                <div className={styles.one}></div>
                <div className={styles.two}></div>
                <div className={styles.three}></div>
            </div>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/chat" className={({isActive}) => (isActive ? styles.active : '')}>Chat</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>Sobre</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({isActive}) => (isActive ? styles.active : '')}>Contato</NavLink>
                </li>
            </ul>
            <ul className={styles.links_list_right}>
                <li>
                    <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>Entrar</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>Cadastrar</NavLink>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar