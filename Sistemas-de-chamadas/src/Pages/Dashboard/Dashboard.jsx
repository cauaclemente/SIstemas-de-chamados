import { useContext } from "react";
import { AuthContext } from "../../Contexts/Auth";
import Header from "../../Components/Header/Header";


const Dashboard = () => {

  const { logout } =useContext(AuthContext)

  async function handleLogout() {
    await logout()
  } 

  return (
    <>
    <Header />
    <h1>pagina adm</h1>
    <button onClick={handleLogout}>Sair da conta</button>
    </>
  )
}

export default Dashboard