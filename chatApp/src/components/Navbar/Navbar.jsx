// import React from "react";
import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import styles from './Navbar.module.css';

function Navbar() {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();
    const [clicked, setClicked] = React.useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }
  
    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                CoderBot
            </NavLink>
            <ul className={`${styles.links_list} ${clicked ? styles.active : ''}`}>
                <li>
                    <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
                </li>
                {user && (
                    <>
                        <li>
                            <NavLink to="/chat" className={({isActive}) => (isActive ? styles.active : '')}>Chat</NavLink>
                        </li>
                        <li>
                            <NavLink to="/create-example" className={({isActive}) => (isActive ? styles.active : '')}>Criar novo exemplo</NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>Sobre</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({isActive}) => (isActive ? styles.active : '')}>Contato</NavLink>
                </li>
                <li>
                     <NavLink to="/researchers" className={({isActive}) => (isActive ? styles.active : '')}>Pesquisadores</NavLink>
                </li>
            </ul>
            <ul className={styles.links_list_right}>
                {!user ? (
                    <>
                        <li className={styles.bottom_entrar}>
                            <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>Entrar</NavLink>
                        </li>
                        <li className={styles.bottom_cadastrar}>
                            <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>Cadastrar</NavLink>
                        </li>
                        
                      
                    </>
                ) : (
                    <li className={styles.container_name_user}>
                        <span>{user.displayName}</span>
                        <NavLink className={styles.bottom_sair} onClick={logout}>Sair</NavLink>
                    </li>
                )}
            </ul>
            {/* Mobile menu icon */}
            <div className={styles.mobile} onClick={handleClick}>
                <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>

        </nav>
    );
}

export default Navbar;
