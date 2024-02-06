import { useState } from "react";
import logo from "../../assets/logo-antena.png"
import { Link } from "react-router-dom";

const SignUp = () => {
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <>
      <div className="container-center">
        <div className="login">
          <div className="login-area">
            <img src={logo} alt="Logo do sistemas de chamadas" />
          </div>
          <form>
            <h1>Nova Conta</h1>
            <input 
              type="text" 
              placeholder="Seu nome" 
              value={name}
              onChange={ (e) => setName(e.target.value) }
              />
            <input 
              type="text" 
              placeholder="email@email.com" 
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
              />

            <input 
              type="password" 
              placeholder="Senha" 
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
              />

            <button
              className="acessar"
              type="submit">
                Cadastrar
            </button>

          </form>

          <Link to="/">Já possui uma conta?<span style={{color: "red"}}> Faça login </span></Link>
        </div>
      </div>
    </>
  )
}

export default SignUp