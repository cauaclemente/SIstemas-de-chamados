import Header from "../../Components/Header/Header";
import { Title } from "../../Components/Title/Title";
import { FiPlusCircle } from "react-icons/fi"
import "./New.css";

const New = () => {
  return (
    <>
        <Header />
        <div className="content">
            <Title name="Novo chamado">
                <FiPlusCircle size={25} />
            </Title>
            <div className="container">
                <form className="form-profile">
                    <label>Clientes</label>
                    <select>
                        <option key={1} value={1}>Mercado do ze</option>
                        <option key={2} value={2}>Loja iphones</option>
                    </select>
                    <label>Assunto</label>
                    <select>
                        <option value="Suporte">Suporte</option>
                        <option value="Visita Tecnica">Visita Tecnica</option>
                        <option value="Financeira">Financeiro</option>
                    </select>
                    <label>Status</label>
                    <div className="status">
                        <input 
                            type="radio"
                            name="radio"
                            value="Aberto"
                            />
                        <span>Em aberto</span>
                        <input 
                            type="radio"
                            name="radio"
                            value="Progresso"
                            />
                        <span>Progresso</span>
                        <input 
                            type="radio"
                            name="radio"
                            value="Atendido"
                            />
                        <span>Atendido</span>
                    </div>
                    <label>Complemento</label>
                        <textarea 
                            type="text"
                            placeholder="Descreva o seu problema (opcional)."
                        />
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default New