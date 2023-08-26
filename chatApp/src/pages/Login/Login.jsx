import React from 'react'
import styles from './Login.module.css'

import { useState, useEffect } from "react";

import { GoogleButton } from 'react-google-button';

import { useAuthentication } from "../../hooks/useAuthentication";

import { auth, provider } from '../../firebase/config';
import { signInWithPopup } from "firebase/auth";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user = {
      email,
      password,
    }

    const res = await login(user)
    console.log(res)
  }

  const [value, setValue] = useState("");
  const handleClick = async () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email)
    });
  }

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o chatBot</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail: </span>
          <input 
            type="email" 
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha: </span>
          <input 
            type="password" 
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className={styles.buttonsContainer}>
          {!loading && <button className="btn">Entrar</button>}
          {loading && <button className="btn" disabled>Aguarde...</button>}
          {error && <p className="error">{error}</p>}

          <div className={styles.lineWithText}>
            <div className={styles.line}></div>
            <div className={styles.text}>ou</div>
            <div className={styles.line}></div>
          </div>
          
          <GoogleButton onClick={handleClick} label={'Entrar com o Google'}/ >
        </div>
      </form>
    </div>
  )
}

export default Login