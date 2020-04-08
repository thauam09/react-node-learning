import React, { Component } from 'react';
import './Button.css'

class Button extends Component {
  
  constructor(props){
    super(props);

    this.state = {

    }

  }

  
  render(){return (
    <div className="Button">
      <a className="botao" onClick={this.props.fraseEscolhida}>Quebrar Biscoito</a>
    </div>
  );
}}

export default Button;
