import { useState } from "react";
import { Link } from "react-router-dom";

import "./Signin.css"
import logo from "../../assets/logo-antena.png"

const Signin = () => {

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
            <h1>Entar</h1>
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
                  Acessar
                </button>
          </form>

          <Link to="/register">Não possui uma conta?<span style={{color: "red"}}> Cadastre-se </span></Link>
        </div>
      </div>
    </>
  )
}

export default Signin