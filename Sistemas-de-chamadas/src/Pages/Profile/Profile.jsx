import Header from "../../Components/Header/Header";
import { Title } from "../../Components/Title/Title";
import { AuthContext } from "../../Contexts/Auth";
import { useContext, useState } from "react";

import "./Profile.css";
import { FiSettings, FiUpload } from "react-icons/fi";
import avatarImg from '../../assets/avatar.png';

const Profile = () => {

  const { user } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)

  return (
    <>
        <Header />
        <div className="content">
          <Title name="Minha conta">
            <FiSettings size={25} />
          </Title>

          <div className="container">

            <form className="form-profile">
              <label className="label-avatar">
                <span>
                  <FiUpload color="#fff" size={25} />
                </span>
                <input type="file" accept="image/*"/> <br />
                {avatarUrl === null ? (
                  <img src={avatarImg} alt="Foto de perfil" width={250} height={250} />
                ):(
                  <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                )}
                {}
              </label>
              <label>Nome</label>
                <input type="text" placeholder="Seu nome" />
              <label>Email</label>
                <input type="text" placeholder="Email@mail.com" disabled={true} />
              <button type="submit">Salvar</button>
            </form>
          </div>
            <div className="container">
                  <button className="logout-btn">Sair</button>
            </div>  
        </div>
    </>
  )
}

export default Profile