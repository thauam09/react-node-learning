import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: '',
      nome: '',
      idade: '',
      cargoInput: '',
      nomeInput: '',
      idadeInput: '',
      usuarios: [],
      user: null
    }
    
    //this.getUsuarios = this.getUsuarios.bind(this);
    this.cadastrar = this.cadastrar.bind(this);
    this.logar = this.logar.bind(this);
    this.auth = this.auth.bind(this);
    this.sair = this.sair.bind(this);
    //this.sair = this.sair.bind(this);
    
    
    //firebase.auth().signOut();
    /*firebase.auth().onAuthStateChanged((user) => {
      if(user){
        firebase.database().ref('usuarios').child(user.uid).set({
          nome: this.state.nome
        })
        .then(() =>
          this.setState({
            nome: '',
            email: '',
            senha: ''
          })
        )
      }
    })*/
  }

  auth(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user: user});
      }
    })

  }

  sair(){
    firebase.auth().signOut()
    .then(() => {
      this.setState({user: null})
      alert('Deslogado com sucesso!');
    });
  }


  /*getUsuarios(){
    let state = this.state;

    firebase.database().ref('usuarios').on('value', (snapshot) => {
      state.usuarios = [];
      snapshot.forEach((item) => {
        state.usuarios.push({
          key: item.key,
          nome: item.val().nome,
          idade: item.val().idade,
          cargo: item.val().cargo
        });
      });

      this.setState(state);
      
    });
  }*/
  
  logar(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
    .catch((error) => {
        alert(`Código de erro: ${error.code}`);
    });
  }

  cadastrar(){
    
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
    .then(()=>{
      this.setState({
        nome: '',
        email: '',
        senha: ''
      })
    })
    .catch((error) => {
        alert(`Código de erro: ${error.code}`);
    });
    
    //Inserindo e alterando um novo dado
    //firebase.database().ref('token').set(this.state.tokenInput);
    
    //Alterando ou criando novo dado (se a referência não existe o dado é criado)
    //firebase.database().ref('usuarios').child(1).child('idade').set(this.state.idadeInput);
    //firebase.database().ref('usuarios').child(1).child('cargo').set(this.state.nomeInput);
    
    //Deletando um registro
    //firebase.database().ref('usuarios').child(1).child('cargo').remove();
}
  
  componentDidMount(){

    this.auth();

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

    //this.getUsuarios();

  }

  render(){
    const {cargoInput, nomeInput, idadeInput} = this.state;
    
    return(
      <div className="App">

        {this.state.user ? 
          <div>
            <p>Painel Admin</p>
            <p>Seja Bem-vindo</p>
            <p>{this.state.user.email}</p>
            <button onClick={this.sair}>Sair</button>
          </div> :

          <div>
            <h1>Seja bem-vindo!</h1>

            <label>Email:</label><br/>
            <input type="text" value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})} /><br/>

            <label>Senha:</label><br/>
            <input type="text" value={this.state.senha}
                    onChange={(e) => this.setState({senha: e.target.value})} /><br/>

            <button onClick={this.cadastrar}>Cadastrar</button>
            <button onClick={this.logar}>Login</button>
          </div>
        }


      </div>
  )}
}

export default App;