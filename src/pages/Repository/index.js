import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Loading, Container, Owner, IssueList } from './styles';

export default function Repository() {
  let params = useParams();

  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
    const repoName = decodeURIComponent(params.id);

     setRepository({});
     setIssues([]);

     const [repos, issues] = await Promise.all([
       api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          }
        })
        ])

        setRepository(repos.data);
        setIssues(issues.data);
        setLoading(false);

    })()
  }, [])

     if(loading) {
       return (
         <Loading>
          Carregando
         </Loading>
       )
     }else{
       return (
         <Container>
           <Link to="/">Voltar aos repositórios</Link>
            <Owner>
              <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
              <h1>{repository.name}</h1>
              <p>{repository.description}</p>
            </Owner>

            <IssueList>
              {issues.map(issue => (
                <li key={issue.id}>
                 <img src={issue.user.avatar_url} alt={issue.user.login}/>
                 <div>
                   <strong>
                     <a href={issue.html_url}>{issue.title}</a>
                     {issue.labels.map(label => (
                       <span key={label.id}>{label.name}</span>
                     ))}
                   </strong>
                   <p>{issue.user.login}</p>
                 </div>
                </li>
              ))}
            </IssueList>
         </Container>
       );
     }
}
