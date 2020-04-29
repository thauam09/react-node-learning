import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './new.css'

class New extends Component{

    constructor(props){
        super(props);

        this.state = {
            titulo: '',
            image: null,
            url: '',
            descricao: '',
            alert: '',
            progress: 0
        }
        this.postar = this.postar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }
    }

    handleFile = async (e) => {

        if(e.target.files[0]){

            const image = e.target.files[0];

            if(image.type === 'image/png' || image.type === 'image/jpeg'){
                await this.setState({image: image});
                this.handleUpload();
            }else{
                alert('Envie uma image do tipo PNG ou JPG');
                this.setState({image: null})
                return null;
            }            
        }
    }

    handleUpload = async () => {
        const { image } = this.state;
        const currentUid = firebase.getCurrentUid();
        console.log(currentUid);
        const uploadTask = firebase.storage
        .ref(`images/${currentUid}/${image.name}`)
        .put(image);

        await uploadTask.on('state_changed', 
        (snapshot) => {
            //progress
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
        },
        (error)=>{
            //error
            console.log(error);
        },
        () => {
            //sucesso
            firebase.storage.ref(`images/${currentUid}`)
            .child(image.name).getDownloadURL()
            .then(url => {
                this.setState({url})
            })
        }     
        )

    }

    postar = async (e) => {
        e.preventDefault();

        if(this.state.titulo !== '' && 
            this.state.image !== '' && 
            this.state.descricao !== '' &&
            this.state.image !== null &&
            this.state.url !== ''){
                
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
               titulo: this.state.titulo,
               image: this.state.url,
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

                    <label>Imagem:</label><br/>
                    <input type="file" onChange={this.handleFile}/><br/>
                    {this.state.url !== '' ?
                        <img src={this.state.url} alt="capa do post" />
                        :
                        <progress value={this.state.progress} max="100"/>
                    }

                    <label>Titulo</label><br/>
                    <input type="text" placeholder="Nome do post" value={this.state.titulo} autoFocus
                            onChange={(e) => this.setState({titulo: e.target.value})}/><br/>
                            

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