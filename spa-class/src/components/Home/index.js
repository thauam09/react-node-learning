import React from 'react';

import Inicio from '../Inicio';
import Sobre from '../Sobre';
import Contato from '../Contato'
import '../../style.css'

function Home() {
  return (
    <div className="Home">
      <Inicio/>
      <Sobre/>
      <Contato/>
    </div>
  );
}

export default Home;
