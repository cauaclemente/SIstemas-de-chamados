import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import { format } from "date-fns"

import Header from "../../Components/Header/Header";
import { Title } from "../../Components/Title/Title";
import "./Dashboard.css";

import { collection, getDocs, orderBy, limit, startAfter, query} from "firebase/firestore";
import { db } from "../../Services/Firebase";

const Dashboard = () => {

  const listRef = collection(db, "chamados")

  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDoc, setLastDoc] = useState()
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
      async function loadChamados() {
        const q = query(listRef, orderBy("created", "desc"), limit(5));

        const querySnapshot = await getDocs(q)
        setChamados([])

        await updateState(querySnapshot)
          
        setLoading(false)
      }

      loadChamados();

      return () => {}
  },[])

  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0;

    if(!isCollectionEmpty) {
      let lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(),  "dd/MM/yyyy"),
          status: doc.data().status,
          complemento: doc.data().complemento	
        })
      })

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
      setChamados(chamados => [...chamados, ...lista])
      setLastDoc(lastDoc)

    }else {
      setIsEmpty(true)

    }

    setLoadingMore(false)

  }

  if(loading) {
    return (
      <div>
        <Header />
        <div className="content">
          <Title name="Tickets">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
          <span>Buscando chamados...
          <CgSpinner className="spinner-chamados" />

          </span>
          </div>
        </div>
      </div>
    )
  }

  async function handleMore() {
    setLoadingMore(true)

    const q = query(listRef, orderBy("created", "desc"), startAfter(lastDoc), limit(5));
    const querySnapshot = await getDocs(q)
    await updateState(querySnapshot)
  }

  return (
    <>
    <Header />
    <div className="content">
      <Title name="Tickets">
        <FiMessageSquare size={25} />
      </Title>
      {chamados.length === 0 ? (
        <div className="container dashboard">
          <span>Nenhum chamado encontrado...</span>
          <div className="nenhum-new">
          <Link to="/new" className="new">
            <FiPlus color="#fff" size={25} />
            Novo chamado
          </Link>                    
          </div>
        </div>
      ): (
        <>
          <Link to="/new" className="new">
            <FiPlus color="#fff" size={25} />
            Novo chamado
          </Link>
          <table>
            <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Assunto</th>
              <th scope="col">Status</th>
              <th scope="col">Cadastrado em</th>
              <th scope="col">#</th>
            </tr>
          </thead>
            <tbody>
              {chamados.map((item, index) => {
                return (
                  <tr key={index}>
                    <td data-label="Cliente">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="Status">
                        <span className="badge" style={{backgroundColor: item.status === "Aberto" ? 
                        "#007a00" :  "#999" }}>
                         {item.status}
                        </span>
                      </td>
                      <td data-label="Cadastro">{item.createdFormat}</td>
                      <td data-label="#">
                          <button className="actions" style={{backgroundColor: "#3583f6"}}>
                            <FiSearch color="#fff" size={17} />
                          </button>
                          <button className="actions" style={{backgroundColor: "#f6a935"}}>
                            <FiEdit2 color="#fff" size={17} />
                          </button>
                      </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
          {loadingMore && <h3 className="buscar">Buscando mais chamados...</h3>}
          {!loadingMore && !isEmpty && 
          <button className="btn-more" onClick={handleMore}>Buscar mais</button>}
        </>
      )}      
    </div>
    </>
  )
}

export default Dashboard