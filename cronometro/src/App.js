import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      numero: 0,
      playPause: 'PLAY'
    }
    this.timer = null;
    this.playPause = this.playPause.bind(this);
    this.limpar = this.limpar.bind(this);
  }

  playPause(){
    let state = this.state;
    
    if(this.timer === null){
      console.log("oi");
      this.timer = setInterval((numero) => {
        state.numero += 0.1;
        this.setState(state);
      }, 100);
      state.playPause = 'PAUSE';
      document.getElementById("limpar").className = 'botao';
    }else{
      clearInterval(this.timer);
      this.timer = null;
      state.playPause = 'PLAY';
    }
    this.setState(state);
  }

  limpar(){
    let state = this.state;

    if(this.numero !== 0){
      clearInterval(this.timer);
      this.timer = null;
      state.playPause = 'PLAY';
      state.numero = 0;
      document.getElementById("limpar").className = 'botaoClicado';
      this.setState(state);
    }

    
  }

  render(){
    return (
      <div className="App">
        <img className="img" src={require('./assets/cronometro.png')}/>
        <a className="timer">{this.state.numero.toFixed(1)}</a>
        <div className="areaBtn">
          <a className="botao" onClick={this.playPause}>{this.state.playPause}</a>
          <a className="botaoClicado" id="limpar" onClick={this.limpar}>LIMPAR</a>
        </div>
      </div>
    );
  }
}

export default App;
