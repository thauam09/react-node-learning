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
      cargoInput: '',
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

    let temp = [];

    firebase.database().ref('usuarios').on('value', (snapshot) => {
      
      if(temp.length !== 0){
        temp = [];
      }

      let dados = snapshot.val();
      
      for(let prop in dados){
        temp.push(dados[prop]);
      }
      console.log(state.usuarios)
      this.setState({usuarios: temp});  
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
      idade: this.state.idadeInput,
      cargo: this.state.cargoInput
    });

    this.setState({
      nomeInput: '',
      idadeInput: '',
      cargoInput: ''
    });

    e.preventDefault();
  }

  componentDidMount(){

    /*firebase.database().ref('token').on('value', (snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });*/

    /*firebase.database().ref('usuarios').child(1).on('value', (snapshot) => {
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state);
    });*/

    this.getUsuarios();

  }

  render(){
    const {cargoInput, nomeInput, idadeInput} = this.state;
    
    return(
      <div className="App">
        <h1>Cadastro de Usuários</h1>


        <form onSubmit={(e) => this.cadastrar(e)}>

          <label>Nome:</label><br/>
          <input type="text" id="nome" value={nomeInput}
                  onChange={(e) => this.setState({nomeInput: e.target.value})}/><br/>

          <label>Idade:</label><br/>
          <input type="number" id="idade" value={idadeInput}
                  onChange={(e) => this.setState({idadeInput: e.target.value})}/><br/>

          <label>Cargo:</label><br/>
          <input type="text" id="token" value={cargoInput} 
                  onChange={(e) => this.setState({cargoInput: e.target.value})}/><br/>
                  
          <button type="submit">Salvar dados</button>
        </form>

        <div className="dados-usuario">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Cargo</th>
              </tr>
            </thead>
            <tbody>
              {this.state.usuarios.map((item, index) => {
                
                return(    
                  <tr key={index}>
                    <td className="nome">{item.nome}</td>
                    <td className="idade">{item.idade}</td>
                    <td className="cargo">{item.cargo}</td>
                  </tr>
                )
              })}
            </tbody>  
          </table>
        </div>
      </div>
  )}
}

export default App;