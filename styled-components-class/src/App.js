import React from 'react';
import { Container, Head, BemVindo } from './styles.js'

function App() {
  return (
    <Container>
      <Head>
        <a>Projeto Styled</a>
      </Head>

      <BemVindo cor="00FF00" tamanho="100">Bem vindo ao sistema!</BemVindo>
    </Container>
  );
}

export default App;

/*
<header className="header">
        <a className="titulo">Projeto Styled</a>
      </header>

      <h1>Bem vindo ao sistema!</h1>
*/
