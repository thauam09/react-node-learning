import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
    };

  }
  
  componentDidMount(){
    
  }


  render(){
    return (
      <div className="Home">
        <h1>Minha página Home</h1>
      </div>
    );
  }
}

export default Home;
