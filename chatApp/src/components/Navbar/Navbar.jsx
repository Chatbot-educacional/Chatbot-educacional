import { NavLink } from "react-router-dom"

import { useAuthentication } from "../../hooks/useAuthentication";

import { useAuthValue } from "../../context/AuthContext";

import styles from './Navbar.module.css';
import { Component } from "react";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
class Navbar extends Component{

    state ={clicked : false}; /*verifica se clicou no menu do mobile*/
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
    return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            Chat <span>Bot</span>
        </NavLink>
            <ul className={`${styles.links_list} ${this.state.clicked ? styles.active : ''}`}>
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
            </li>
                    <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>Sobre</NavLink>
            <li>
            </li>
                    <NavLink to="/contact" className={({isActive}) => (isActive ? styles.active : '')}>Contato</NavLink>
        </ul>
        <ul className={styles.links_list_right}>
        {!user && (
            <>
            </>
        )}
                <li>
                    <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>Entrar</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>Cadastrar</NavLink>
                </li>
            {user && (
                <li>
                    <NavLink onClick={logout} className={({isActive}) => (isActive ? styles.active : '')}>Sair</NavLink>
                </li>
            )}
        </ul>
        <div className={styles.mobile} onClick={this.handleClick}>
            <i id="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
    </nav>
  )
}
}
export default Navbar