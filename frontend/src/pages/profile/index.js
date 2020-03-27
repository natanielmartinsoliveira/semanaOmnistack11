import React,{useEffect, useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './style.css';
import api from '../../services/api';
export default function Profile (){
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    

    async function handleDeleteIncident(id){
        
        try{
            await api.delete(`incident/${id}`,{
                headers: { 
                    Authorization: ongId 
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
            
        }catch(err){
            alert(`Erro ao Logar, Tente novamente`);
        }
        
        
    }
    async function handleLogout(id){
        
        localStorage.clear();
        history.push('/');
        
    }
    useEffect(() => {
        api.get('profile',{
            headers: { 
                Authorization: ongId 
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);
    return (
        <div className="profile-container">
            <header>
               <img src={logo} alt='logo'/>
    <span>Bem vindo, {ongName} </span>
               <Link className="button" to="/incidents/new">Cadastrar novo</Link>
               <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"></FiPower>
               </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>{incidents.map(incident => (
               <li key={incident.id}>
                    <strong>Caso</strong>
                    <p>{incident.title}</p>
                    <strong>Descrição</strong>
                    <p>{incident.description}</p>
                    <strong>Valor</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(incident.value)}</p>
                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}><FiTrash2 size={20} color="#a8a8b3"/></button>
                </li> 
            ))}
                
            </ul>
        </div>
    )
}