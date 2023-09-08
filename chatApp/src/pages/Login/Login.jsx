import { useState, useEffect } from "react";

import { useAuthentication } from "../../hooks/useAuthentication";

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

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="text-center mt-12">
      <h1>Entrar</h1>
      <p className="text-gray-500">Faça o login para poder utilizar o chatBot</p>
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
        {!loading && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-20 rounded-full mt-20">Entrar</button>}
        {loading && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-20 rounded-full" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login
