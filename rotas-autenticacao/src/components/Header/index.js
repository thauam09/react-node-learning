import React from 'react';
import {Link} from 'react-router-dom'
import './style.css';

function Header() {
  return (
    <div className="Header">
        <div className="tituloDiv">
          <Link className="titulo" to="/">Filmaria</Link>
        </div>
        <div className="opcaoDiv"> 
          <Link className="opcao" to="/">Home</Link>
          <Link className="opcao" to="/sobre">Sobre</Link>
        </div>
    </div>
  );
}

export default Header;
