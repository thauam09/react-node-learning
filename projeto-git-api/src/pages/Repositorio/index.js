import React, { useState, useEffect} from 'react';
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterIssues } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

export default function Repositorio({match}){

    const [repositorio, setReposiorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('open');

    useEffect(()=> {

        async function load(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            //const response = api.get(`/repos/${nomeRepo}`);

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params:{
                        state: 'open',
                        per_page: 5 
                    }
                })
            ]);

            setReposiorio(repositorioData.data);
            setIssues(issuesData.data);
            console.log(issuesData.data);

            setLoading(false);
        }

        load();
    },[match.params.repositorio]);


    useEffect(() => {

        async function loadIssue(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: filter,
                    page,
                    per_page: 5,
                }
            });

            console.log(response.data);
            setIssues(response.data);
        }

        loadIssue();

    }, [match.params.repositorio, page, filter]);

    function handlePage(action){
        setPage(action === 'previous' ? page - 1 : page + 1 );
    }

    function handleFilter(filter){
        setFilter(filter);
    }

    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return(
        <Container>
            <BackButton to={"/"}>
                <FaArrowLeft color="#000" size={30}/>
            </BackButton>
            <Owner>
                <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}/>
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>

            <FilterIssues>
                <p>Filtrar por:</p>

                <button type="button" onClick={() => handleFilter('all')} disabled={filter === 'all'}>
                    All
                </button>

                <button type="button" onClick={() => handleFilter('open')} disabled={filter === 'open'}>
                    Open
                </button>

                <button type="button" onClick={() => handleFilter('closed')} disabled={filter === 'closed'}>
                    Closed
                </button>
            </FilterIssues>

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />
                        
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>

                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>

                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <PageActions>
                <button type="button" onClick={() => handlePage('previous')} disabled={page < 2}>
                    Voltar
                </button>

                <span>{page}</span>

                <button type="button" onClick={() => handlePage('next')}>
                    Próxima
                </button>
            </PageActions>

        </Container>
    );
}

