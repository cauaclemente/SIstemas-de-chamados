import { Routes, Route} from "react-router-dom";
import Signin from "../Pages/Signin/Login";
import SignUp from "../Pages/SignUp/Cadastro";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Private from "./Private";
import Profile from "../Pages/Profile/Profile";
import Customers from "../Pages/Customers/Customers";
import New from "../Pages/New/New";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={ <Signin /> } />
            <Route path="/register" element={ <SignUp /> } />

            <Route path="/dashboard" element={ <Private> <Dashboard /> </Private> } />
            <Route path="/profile" element={ <Private> <Profile /> </Private>} />
            <Route path="/customers" element={ <Private> <Customers /> </Private>} />
            <Route path="/new" element={ <Private> <New /> </Private>} />
            <Route path="/new/:id" element={ <Private> <New /> </Private>} />
        </Routes>
    )
}

export default RoutesApp