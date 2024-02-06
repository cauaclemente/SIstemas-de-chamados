import { Routes, Route} from "react-router-dom"
import Signin from "../Pages/Signin/Login"
import SignUp from "../Pages/SignUp/Cadastro"

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={ <Signin /> } />
            <Route path="/register" element={ <SignUp /> } />
        </Routes>
    )
}

export default RoutesApp