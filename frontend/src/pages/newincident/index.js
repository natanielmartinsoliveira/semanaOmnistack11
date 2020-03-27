import React, {useState}from 'react';
import logo from '../../assets/logo.svg';
import { Link,useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './style.css';
export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    async function handleIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };
        try{
            await api.post('incident', data,
            {
                headers: { 
                    Authorization: ongId 
                }
            });
            
            history.push('/profile');
        }catch(err){
            alert(`Erro ao Gravar`);
        }
        
    }
    return(
        <div className="newincident-container">
        <div className="content">
            <section>
               <img src={logo} alt='logo'/>
               <h1>Cadastrar Novo Caso</h1>
               <p>Descreva o caso detalhado para encontrar um heroi para resolver isso.</p>
               <Link to='/profile' className="back-link">
                   <FiArrowLeft size={16} color="#e02041"/> 
                   Voltar para Home
                   </Link>
            </section>
            
            <form>
                <input placeholder="Titulo do caso" 
                value={title} 
                onChange={e => setTitle(e.target.value)}/>
                <textarea placeholder="Descriçao do Caso"
                value={description} 
                onChange={e => setDescription(e.target.value)}></textarea>
                <input placeholder="valor em Reais" 
                value={value} 
                onChange={e => setValue(e.target.value)}/>
                <button className="button" type="submit" onClick={handleIncident}>Cadastrar</button>
            </form>
        </div>
    </div>
    )
}