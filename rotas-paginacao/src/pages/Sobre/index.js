import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

class Sobre extends Component {
  
  render(){
        return (
            <div className="Sobre">
                <h2>Minha Sobre Page</h2>
                <Link to="/">Voltar a Home</Link>
            </div>
        );
    }
}

export default Sobre;
