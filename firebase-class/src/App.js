import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      token: 'Carregando...',
      nome: '',
      idade: '',
      tokenInput: '',
      nomeInput: '',
      idadeInput: '',
      usuarios: []
    }

    /*Olheiro
    firebase.database().ref('token').on('value', (snapshot) =>{
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    })
    */

    this.getUsuarios = this.getUsuarios.bind(this);
    this.cadastrar = this.cadastrar.bind(this);
  }


  getUsuarios(){
    let state = this.state;

    firebase.database().ref('usuarios').on('value', (snapshot) => {
      
      let dados = snapshot.val();
      state.usuarios = dados;


      console.log(typeof dados);
      console.log(state);
      this.setState(state);  
    });
  }

  cadastrar(e){

    //Inserindo e alterando um novo dado
    //firebase.database().ref('token').set(this.state.tokenInput);

    //Alterando ou criando novo dado (se a referência não existe o dado é criado)
    //firebase.database().ref('usuarios').child(1).child('idade').set(this.state.idadeInput);
    //firebase.database().ref('usuarios').child(1).child('cargo').set(this.state.nomeInput);

    //Deletando um registro
    //firebase.database().ref('usuarios').child(1).child('cargo').remove();

    let usuarios = firebase.database().ref('usuarios');
    let chave = usuarios.push().key;
    usuarios.child(chave).set({
      nome: this.state.nomeInput,
      idade: this.state.idadeInput
    });

    e.preventDefault();
  }

  componentDidMount(){

    firebase.database().ref('token').on('value', (snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });

    firebase.database().ref('usuarios').child(1).on('value', (snapshot) => {
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state);
    });

    this.getUsuarios();

  }

  render(){
    const {token, nome, idade, tokenInput, nomeInput, idadeInput} = this.state;

    return(
      <div>
        <h1>Cadastro de Usuários</h1>


        <form onSubmit={(e) => this.cadastrar(e)}>
          <label>Token:</label><br/>
          <input type="text" id="token" value={tokenInput} 
                  onChange={(e) => this.setState({tokenInput: e.target.value})}/><br/>

          <label>Nome:</label><br/>
          <input type="text" id="nome" value={nomeInput}
                  onChange={(e) => this.setState({nomeInput: e.target.value})}/><br/>

          <label>Idade:</label><br/>
          <input type="number" id="idade" value={idadeInput}
                  onChange={(e) => this.setState({idadeInput: e.target.value})}/><br/>

          <button type="submit">Salvar dados</button>
        </form>

        {this.state.usuarios.map((item) => {

            return(
              <div className="dados-usuario">
                <h3>Nome: {item.nome}</h3>
                <h3>Idade: {item.idade}</h3>
                <h3>Cargo: {item.cargo}</h3>
              </div>
            )
          })}
        

      </div>
    );
  }
}

export default App;
