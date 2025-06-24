import MenuSuspenso from "../Components/MenuSuspenso";
import Formulario from "../Components/Formulario";
import Button from "../Components/Button";
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import Input from "../Components/Input";
import styled from "styled-components";
import { useState } from "react";

const MainStyled = styled.main`
  gap: 20px;
  display: flex;
  height: 75svh;
  max-width: 500px;
  flex-direction: column;
  justify-content: center;
  justify-self: center;

  input{
    margin:0;
    font-size:18px;
  }
`

const GerenciarAula = () => {
  const [name, setName] = useState()
  const [date, setDate] = useState()
  const [link, setLink] = useState()

  return (<>
    <Header />
    <MainStyled>
      <h1>Criar Aula</h1>
      <Formulario>
        <Input
          type='text'
          required
          onChange={e => { setName(e.target.value) }}
          value={name}
          placeholder="Titulo" />
        <MenuSuspenso
          label="Status"
          db="status"
          value="a"
          required
        />
        <Input
          type='date'
          required
          onChange={e => { setDate(e.target.value) }}
          value={date}
          placeholder="Data de publicação do post" />
        <Input
          type='url'
          required
          onChange={e => { setLink(e.target.value) }}
          value={link}
          placeholder="link" />
        <Button type='submit'>submit</Button>
      </Formulario>
    </MainStyled>
    <Footer />
  </>)
}

export default GerenciarAula