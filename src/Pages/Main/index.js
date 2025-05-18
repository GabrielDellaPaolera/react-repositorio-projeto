import React from 'react';
import { Container,Form,SubmitButton } from './styles';
import {FaGithub, FaPlus} from 'react-icons/fa'


export default function Main() {
return (

   <Container>
     <h1>
      <FaGithub size = {25} />
        Meus Repositorios 
        </h1>   

   <Form onSubmit = {() => {}}>
      <input type="text" placeholder="Digite o nome do repositorio" />

       <SubmitButton>
         <FaPlus size={14} color="#FFF" />
         </SubmitButton>   

   </Form>

 </Container>   

)}