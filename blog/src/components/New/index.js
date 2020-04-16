import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './new.css'

class New extends Component{

    constructor(props){
        super(props);

        this.state = {
            titulo: '',
            imagem: '',
            descricao: '',
            alert: ''
        }
        this.postar = this.postar.bind(this);
    }

    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }
    }

    postar = async (e) => {
        e.preventDefault();

        if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== ''){
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
               titulo: this.state.titulo,
               image: this.state.imagem,
               descricao: this.state.descricao,
               autor: localStorage.nome 
            });
            this.setState({alert: ''});
            this.props.history.push('/dashboard');
        }else{
            this.setState({alert: 'Por favor, preencha todos os campos!'});
        }
    }

    render(){
        return(
            <div>
                <header id="new">
                    <Link to='/dashboard'>Voltar</Link>
                </header>
                <form onSubmit={this.postar} id="new-post">
                    <span>{this.state.alert}</span>
                    <label>Titulo</label><br/>
                    <input type="text" placeholder="Nome do post" value={this.state.titulo} autoFocus
                            onChange={(e) => this.setState({titulo: e.target.value})}/><br/>
                            
                    <label>Imagem:</label><br/>
                    <input type="text" placeholder="URL da capa" value={this.state.imagem} autoFocus
                            onChange={(e) => this.setState({imagem: e.target.value})}/><br/>

                    <label>Descrição</label><br/>
                    <textarea placeholder="Descrição do post" value={this.state.descricao} autoFocus
                            onChange={(e) => this.setState({descricao: e.target.value})}/><br/>

                    <button type="submit">Postar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(New)