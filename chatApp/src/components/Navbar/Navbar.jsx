import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument'
import styles from './Navbar.module.css';

function Navbar({ clicks, local, loginTime }) {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);
    const [isInserting, setIsInserting] = React.useState(false);

    const { insertDocument } = useInsertDocument("metrics-users");

    const handleSubmit = async () => {
        setIsInserting(true);
        try {
            let logoutTime = new Date();
            console.log('Login time:', loginTime)
            console.log('Logout time:', logoutTime);
            let elapsedTimeInMilliseconds = logoutTime - loginTime;
            let elapsedTimeInMinutes = elapsedTimeInMilliseconds / (1000 * 60);
            console.log(`O usuário ficou na aplicação por ${elapsedTimeInMinutes} minutos.`);
            const documentData = {
                uid: user.uid,
                createdBy: user.displayName,
                timeInMinutes: elapsedTimeInMinutes,
                totalClicks: clicks,
                localClicks: local
            };
            await insertDocument(documentData);
            console.log('Documento inserido com sucesso:', documentData);
            logout();
        } catch (error) {
            console.error('Erro ao inserir documento:', error);
        } finally {
            setIsInserting(false);
        }
    };

    const handleClick = () => {
        setClicked(!clicked);
    }

    // const handleLogin = () => {
    //     setLoginTime(new Date());
    //     console.log(loginTime)
    //     setIsLoggedIn(true);
    // }

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                CoderBot
            </NavLink>
            <ul className={`${styles.links_list} ${clicked ? styles.active : ''}`}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>Home</NavLink>
                </li>
                {user && (
                    <>
                        <li>
                            <NavLink to="/chat" className={({ isActive }) => (isActive ? styles.active : '')}>Chat</NavLink>
                        </li>
                        {/* ocultado para o experimento 26/11 */}
                        {/* <li>
                            <NavLink to="/create-example" className={({ isActive }) => (isActive ? styles.active : '')}>Criar novo exemplo</NavLink>
                        </li> */}
                    </>
                )}
                { <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>Sobre</NavLink>
                </li>/*
                <li>
                    <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : '')}>Contato</NavLink>
                </li> */}
                <li>
                    <NavLink to="/researchers" className={({ isActive }) => (isActive ? styles.active : '')}>Pesquisadores</NavLink>
                </li>
            </ul>
            <ul className={styles.links_list_right}>
                {!user ? (
                    <>
                        <li className={styles.bottom_entrar}>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>Entrar</NavLink>
                        </li>
                        <li className={styles.bottom_cadastrar}>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')} >Cadastrar</NavLink>
                        </li>


                    </>
                ) : (
                    <li className={styles.container_name_user}>
                        <span style={{ paddingRight: '25px' }}>{user.displayName}</span>
                        <NavLink className={styles.bottom_sair} onClick={handleSubmit}>Sair</NavLink>
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
