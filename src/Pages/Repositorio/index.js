import { Container,Owner,Loading,BackButton } from './styles';
import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function Repositorio() {
  const { repositorio } = useParams(); // <-- Corrigido aqui

  const [repositorioData, setRepositorioData] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
   
        const nomeRepo = decodeURIComponent(repositorio);
        console.log('Carregando dados de:', nomeRepo);

        const [repoResponse, issuesResponse] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: 'open',
              per_page: 5,
            },
          }),
        ]);

        setRepositorioData(repoResponse.data);
        setIssues(issuesResponse.data);
         setLoading(false);
      
    }

    loadData();
  }, [repositorio]);

  if (loading) {
    return (
    <Loading> 
    <h1>Carregando...</h1>;
    </Loading>
  )}


  return (
    <Container>
      <BackButton to="/">

        <FaArrowLeft size={30} color="#000" />

      </BackButton>
      <Owner>
        <img src ={repositorioData.owner.avatar_url}
         alt={repositorioData.owner.login} 
         />
         <h1>{repositorioData.name}</h1>
         <p> {repositorioData.description}</p>
      </Owner>

    </Container>
  );
}
