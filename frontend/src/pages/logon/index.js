import React, { useState }  from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import logo from '../../assets/logo.svg';
import hero from '../../assets/heroes.png';
import api from '../../services/api';

function Logon(){
    const history = useHistory();
    const [id, Setid] = useState('');
    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.name);
            history.push('/profile');
        }catch(err){
            alert(`Erro ao Logar, Tente novamente`);
        }
        
        
    }
    return(
        <div className='logon-container'>
            <section className='form'>
                <img src={logo} alt='logo'/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder='sua id' 
                    value={id} 
                    onChange={e => Setid(e.target.value)} />
                    <button className='button' type='submit'>Entrar</button>
                    <Link to='/register' className="back-link"><FiLogIn size={16} color="#e02041"/> Não tenho cadastro</Link>
                </form>
            </section>
            <img src={hero} alt='hero'/>
        </div>
    )
}
export default Logon;