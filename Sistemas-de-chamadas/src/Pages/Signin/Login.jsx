import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/Auth";

import { CgSpinner } from "react-icons/cg";

import "./Signin.css"
import logo from "../../assets/logo-antena.png"

const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSignIn(e) {
    e.preventDefault();

    if(email !== "" && password !== "") {
      signIn(email, password)
    }
  }
  
  return (
    <>
      <div className="container-center">
        <div className="login">
          <div className="login-area">
            <img src={logo} alt="Logo do sistemas de chamadas" />
          </div>
          <form onSubmit={handleSignIn}>
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

              <button className="acessar" type="submit">
                {loadingAuth ? <CgSpinner className="spinner" /> : "Login  "}
                </button>
          </form>

          <Link to="/register">Não possui uma conta?<span style={{color: "red"}}> Cadastre-se </span></Link>
        </div>
      </div>
    </>
  )
}

export default Signin