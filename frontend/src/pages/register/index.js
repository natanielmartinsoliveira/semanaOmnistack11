import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register(){

    const history = useHistory();

    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [whatsapp, SetWhatsapp] = useState('');
    const [city, SetCity] = useState('');
    const [uf, SetUf] = useState('');

    async function handleregister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        const response = await api.post('ongs', data);
        alert(`Seu Id de acesso: ${response.data.id}`);
        history.push('/');
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                   <img src={logo} alt='logo'/>
                   <h1>Cadastro</h1>
                   <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da ONG.</p>
                   <Link to='/' className="back-link">
                       <FiArrowLeft size={16} color="#e02041"/> 
                       Não tenho cadastro
                       </Link>
                </section>
                
                <form onSubmit={handleregister}>
                    <input 
                    placeholder="Nome da Ong " 
                    value={name} 
                    onChange={e => SetName(e.target.value)}/>
                    <input type="email"
                    placeholder="email"  
                    value={email} 
                    onChange={e => SetEmail(e.target.value)}/>
                    <input placeholder="Whatsapp"  
                    value={whatsapp} 
                    onChange={e => SetWhatsapp(e.target.value)}/>
                    <div className="input-group">
                        <input  placeholder="city"  
                        value={city} 
                        onChange={e => SetCity(e.target.value)}/>
                        <input  
                        placeholder="UF" 
                        style={{ width: 80 }}  
                        value={uf} onChange={e => SetUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
