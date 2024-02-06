import { Routes, Route} from "react-router-dom"
import Signin from "../Pages/Signin/Login"
import SignUp from "../Pages/SignUp/Cadastro"
import Dashboard from "../Pages/Dashboard/Dashboard"

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={ <Signin /> } />
            <Route path="/register" element={ <SignUp /> } />

            <Route path="/dashboard" element={ <Dashboard />} />
        </Routes>
    )
}

export default RoutesApp