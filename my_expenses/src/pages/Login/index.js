import React, { useState, useCallback, useEffect } from 'react';
import { Container, Header } from './styles';
import { Link, Redirect } from 'react-router-dom';


export default function Login(){

    const [password] = useState("senha123");
    const [typedPassword, setTypedPassword] = useState('');
    const [correctPassword, setCorrectPassword] = useState(false); 

    function handleSubmit(e){

        e.preventDefault();
        
        if(typedPassword === password){
            setCorrectPassword(true);
        }else{
            alert("Senha incorreta");
            setTypedPassword("");
        }
    }

    if(correctPassword){
        return(<Redirect to='/home'/>);
    }
    
    else{
        return(
            <Container>
                <Header>
                    <h1>My Expenses - Login</h1>
                </Header>
    
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <label>Para ter acesso ao conteúdo, digite a senha:</label>
                    <input type="password" placeholder="Digite sua senha..." value={typedPassword} onChange={(e) => {setTypedPassword(e.target.value)}}/>
                    <button type="submit">Entrar</button>
                </form>
    
            </Container>
        );
    }

}