import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/Auth';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';
import avatarImg from '../../assets/avatar.png';
import './Header.css';

const Header = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
        <div className={`nav_bar  ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div>
            <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto do usuário" />
          </div>
          <Link to="/dashboard">
            <FiHome color="#fff" size={24} />
            Chamados
          </Link>
          <Link to="/customers">
            <FiUser color="#fff" size={24} />
            Cliente
          </Link>
          <Link to="/profile">
            <FiSettings color="#fff" size={24} />
            Perfil
          </Link>
        </nav>
    </>
  );
};

export default Header;
