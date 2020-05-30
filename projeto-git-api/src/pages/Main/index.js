import React, {useState, useCallback, useEffect} from 'react';
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash, FaExclamation} from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles.js'
import { Link } from 'react-router-dom';

import api from '../../services/api';

export default function Main(){
    
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({alert: false, error: ''});

    //DidMount - Buscar
    useEffect(()=>{
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage){
            setRepositorios(JSON.parse(repoStorage));
        }
        
    }, []);

    //DidUpdate - Salvar alterações
    useEffect(()=>{
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios]);

    const handleOnSubmit = useCallback((e)=>{

        e.preventDefault();

        async function submit(){
            
            setLoading(true);
            setAlert({alert: false, error: ''});
            try{

                if(newRepo === ''){
                    throw new Error('Você precisa indicar um repositório');
                }

                const response = await api.get(`repos/${newRepo}`);
    
                const data = {
                    name: response.data.full_name,
                }

                //Verifica se já existe repositório com mesmo nome
                const hasRepo = repositorios.find(repo => repo.name === newRepo);

                if(hasRepo){
                    throw new Error('Repositório já adicionado!');
                }else{
                    setRepositorios([...repositorios, data]);
                    setNewRepo('');
                }
    
            }catch(error){
                setAlert({alert: true, error});
                console.log(error);
            }finally{
                setLoading(false);
            }

        }

        submit();

    }, [newRepo, repositorios]);

    function handleInputChange(e){
        setNewRepo(e.target.value);
        setAlert({alert: false, error: ''});
    }

    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
    }, [repositorios]);

    return(
        <Container>
        
            <h1>
                <FaGithub size={25}/>
                Meus Repositórios
            </h1>
        
            {alert.alert ? (
                <div className="error-div">
                    <div className="error-icon">
                        <FaExclamation size={30}/>
                    </div>
                    <p>{String(alert.error)}</p>
                </div>
            ) : ''}

            <Form onSubmit={handleOnSubmit} error={alert.alert}>
                <input
                type="text" 
                placeholder="Adicionar Repositórios"
                value={newRepo}
                onChange={handleInputChange}
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14}/>
                    ) : (
                        <FaPlus color="#FFF" size={14}/>
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo.name)}>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            {repo.name}</span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20}/>
                        </Link>
                    </li>
                ))}
            </List>

        </Container>
    );
};