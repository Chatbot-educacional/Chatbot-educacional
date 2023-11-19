import styles from "./Register.module.css";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [classInfo, setClassInfo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user = {
      displayName,
      email,
      password
    }

    if (password !== confirmPassword) {
      setError('As senhas não conferem')
      return
    }

    const res = await createUser(user)
    console.log(res)
    console.log(res.displayName)
  }

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para usar</h1>
      <p>Crie seu usuário e aprenda com o coderBot</p>
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          <span>Nome: </span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          <span>Turma/Professora/Conteúdo:</span>
          <input
            type="text"
            name="classInfo"
            required
            placeholder="Algoritmo e prog, Profa Fulana, Vetores"
            value={classInfo}
            onChange={(e) => setClassInfo(e.target.value)}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          <span>Confirmação de senha: </span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.formInput}
          />
        </label>
        {!loading && (
          <button className={`${styles.btn} ${styles.submitBtn}`}>Cadastrar</button>
        )}
        {loading && (
          <button className={`${styles.btn} ${styles.submitBtn}`} disabled>
            Aguarde...
          </button>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default Register