import React, { Component } from 'react';
import Button from './components/Button/Button'
import './App.css';

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      fraseEscolhida: 'CLIQUE NO BOTÃO PARA ABRIR O BISCOITO'
    };

    this.frases = ['Siga os bons e aprenda com eles.', 'O bom-senso vale mais do que muito conhecimento.', 
                      'O riso é a menor distância entre duas pessoas.', 
                      'Deixe de lado as preocupações e seja feliz.',
                      'Realize o óbvio, pense no improvável e conquiste o impossível.',
                      'Acredite em milagres, mas não dependa deles.',
                      'A maior barreira para o sucesso é o medo do fracasso.'];
      

    this.sortearFrase = this.sortearFrase.bind(this);
  }

  sortearFrase(){
    const state = this.state;
    state.fraseEscolhida = `"${this.frases[Math.floor(Math.random() * this.frases.length)]}"`;

    this.setState(state);
  }
  
  render(){return (
    <div className="App">
      <img className="img" src={require('./assets/biscoito.png')}/>
      <h3 className="frase">{this.state.fraseEscolhida}</h3>
      <Button frases={this.frases} fraseEscolhida={this.sortearFrase}/>
    </div>
  );
}}

export default App;
