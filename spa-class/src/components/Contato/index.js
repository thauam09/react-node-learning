import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

function Contato() {
  return (
    <div className="Home" id="contato">
      <h1>Contate-nos</h1>
      <h2>Número: (11) 97496-9356</h2>
      <h3>Enderço: Rua sem nome, s/n Bairro tal</h3>
      <Link smooth to="#home">Voltar a Home</Link>
    </div>
  );
}

export default Contato;