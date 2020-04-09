import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style.css';

class Erro extends Component {
  
  render(){
        return (
            <div className="Erro">
                <h2>Ops, Pagina não encontrada!</h2>
                <h3>Você está procurando por:</h3>
                <Link to="/sobre">Sobre</Link>
                <Link to="/">Home</Link>
            </div>
        );
    }
}

export default Erro;
