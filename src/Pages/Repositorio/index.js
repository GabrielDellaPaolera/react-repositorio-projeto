import { Container } from './styles';
import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  return (
    <Container>

    </Container>
  );
}
