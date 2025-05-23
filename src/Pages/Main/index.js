import React, {useState , useCallback, useEffect} from 'react';
import { Container,Form,SubmitButton,List,DeleteButton  } from './styles';
import {FaGithub, FaPlus, FaSpinner,FaBars,FaTrash} from 'react-icons/fa'
import { Link } from 'react-router-dom';


import api from '../../services/api';

export default function Main() {

   const [newRepo, setNewRepo] = useState('')
   const [repositorios, setRepositorios] = useState([]);
   const [loading, setLoading] = useState(false);
   const [alert,setAlert] = useState(null);

   //DidMount (Buscar)
   useEffect(() => {
      const repoStorage = localStorage.getItem('repos');
      if (repoStorage) {
         setRepositorios(JSON.parse(repoStorage));
      }
   }, []);

   //DidUpdate (Salvar Alterações)
   useEffect(() => {
      localStorage.setItem('repos', JSON.stringify(repositorios))
   }
   , [repositorios]);

   function handleinputChange (e) {

      setNewRepo(e.target.value)
      setAlert(null);
   }
   
   const handleSubmit = useCallback((e) => {

      e.preventDefault();
   
      async function submit(){

         setLoading(true);
         setAlert(null);


         try{

            if (newRepo === '') {
               throw new Error('Digite o autor/nome do repositorio')
            }

         const response = await api.get(`repos/${newRepo}`)

         const hasRepo = repositorios.find(r => r.name === newRepo);
         if (hasRepo) {
            throw new Error('Repositorio duplicado')
         }
      
         const data = {
            name : response.data.full_name,
            description : response.data.description,
         }

      setRepositorios([...repositorios, data])
      setNewRepo('')
         }catch(error){
            setAlert(true);
            console.log(error)
         }finally {
            setLoading(false)
         }
   }

submit();

}, [newRepo, repositorios]);

const handleDelete = useCallback((repo) => {
   const find = repositorios.filter(r => r.name !== repo);
   setRepositorios(find);
   }, [repositorios]);
   

return (

   <Container>
     <h1>
      <FaGithub size = {25} />
        Meus Repositorios 
        </h1>   

   <Form onSubmit = {handleSubmit} error={alert}>
      <input type="text" 
      placeholder="Digite o nome do repositorio"
      value={newRepo}
      onChange ={handleinputChange}
      />

       <SubmitButton loading={loading ? 1 : 0 }>
         {loading ? (
            <FaSpinner color="#FFF" size={14} />
         ) : (
             <FaPlus size={14} color="#FFF" />
         )}
        
         </SubmitButton>   

   </Form>


   <List> 
      {repositorios.map(repo => (
         <li key={repo.name}>
            <span>
               <DeleteButton onClick={() => handleDelete(repo.name)}>
               <FaTrash size={14} />
               </DeleteButton>
                {repo.name} </span>
            <Link to = {`/repositorio/${encodeURIComponent(repo.name)}`}>
            <FaBars size = {20}/>
            </Link>
         </li>
      ))}
   </List>

 </Container>   

)}