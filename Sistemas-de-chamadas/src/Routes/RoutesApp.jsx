import { Routes, Route} from "react-router-dom"
import Signin from "../Pages/Signin/Login"
import SignUp from "../Pages/SignUp/Cadastro"
import Dashboard from "../Pages/Dashboard/Dashboard"
import Private from "./Private"
import Profile from "../Pages/Profile/Profile"

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={ <Signin /> } />
            <Route path="/register" element={ <SignUp /> } />

            <Route path="/dashboard" element={ <Private> <Dashboard /> </Private> } />
            <Route path="/profile" element={ <Private> <Profile /> </Private>} />
        </Routes>
    )
}

export default RoutesApp