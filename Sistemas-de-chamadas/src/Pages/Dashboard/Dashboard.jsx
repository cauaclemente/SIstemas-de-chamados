import { useContext } from "react";
import { AuthContext } from "../../Contexts/Auth";


const Dashboard = () => {

  const { logout } =useContext(AuthContext)

  async function handleLogout() {
    await logout()
  } 

  return (
    <>
    <h1>pagina adm</h1>
    <button onClick={handleLogout}>Sair da conta</button>
    </>
  )
}

export default Dashboard