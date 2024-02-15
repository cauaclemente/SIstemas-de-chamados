import Header from "../../Components/Header/Header";
import { Title } from "../../Components/Title/Title";
import { AuthContext } from "../../Contexts/Auth";

import { useContext, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../Services/Firebase";

import { toast } from "react-toastify"

import { FiSettings, FiUpload } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import "./Profile.css";
import avatarImg from '../../assets/avatar.png';

const Profile = () => {

  const { user, storageUser, setUser, logout, loadingAuth } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  function handleFile(e) {
    if(e.target.files[0]) {
      const image = e.target.files[0];

    if(image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }else {
      alert("Envie uma imagem do tipo PNG ou JPEG");
      setImageAvatar(null);
      return;
    }

    }
  }

  async function handleUpload() {
    const currentUid = user.uid 

    const uploadRef = ref(storage, `images/${currentUid}/foto`)

    const uploadTask = uploadBytes(uploadRef, imageAvatar)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then( async (downloadURL) => {
        let urlFoto = downloadURL;

        const docRef = doc(db, "users", user.uid)
        await updateDoc(docRef, {
          avatarUrl: urlFoto,
          nome: nome,
        })
        .then(() => {
          let data = {
            ...user,
            nome: nome,
            avatarUrl: urlFoto
          }
  
          setUser(data)
          storageUser(data)
          toast.success("Atualizado com sucesso")
        })
        .catch((error) => {
          console.log(error)
        })
      })
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if(imageAvatar === null && nome !== "") {
      const docRef = doc(db, "users", user.uid)
      await updateDoc(docRef, {
        nome: nome
      })
      .then(() => {
        let data = {
          ...user,
          nome: nome,
        }

        setUser(data);
        storageUser(data);
        toast.success("Atualizado com sucesso");
      })
      
    }else if (nome !== "" && imageAvatar !== null){
      handleUpload()
    }

  }

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
                <input type="file" accept="image/*" onChange={handleFile} /> <br />
                {avatarUrl === null ? (
                  <img src={avatarImg} alt="Foto de perfil" width={250} height={250} />
                ):(
                  <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                )}
                {}
              </label>
              <label>Nome</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
              <label>Email</label>
                <input type="text" value={email} disabled={true} />
              <button type="submit" onClick={handleSubmit} >
                {loadingAuth ? <CgSpinner className="spinner" /> : "Salvar  "}
              </button>
            </form>
          </div>
            <div className="container">
              <button className="logout-btn" onClick={() => logout() }>Sair</button>
            </div>  
        </div>
    </>
  )
}

export default Profile