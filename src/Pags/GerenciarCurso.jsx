import MenuSuspenso from "../Components/MenuSuspenso"
import CampoBusca from "../Components/CampoBusca";
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import Button from "../Components/Button"
import Input from "../Components/Input"
import styled from "styled-components"
import { useState } from "react"

const MainStyled = styled.main`
  gap: 36px;
  display: flex;
  min-height:75vh;
  max-width: 500px;
  margin: 20px 0px;
  flex-direction: column;
  justify-content: center;
  justify-self: center;

  input{
    margin:0;
    font-size: 18px;
  }
  
  form{
    display:flex;
    flex-direction:column;
    padding: 20px;
    gap:20px;
    border: 3px solid var(--cor1);
    border-radius: 27px;
  }

  div{
    gap:20px;
  }

  .basico{
    display:flex;
    flex-direction:column;
    width:100%;

    div{
      display:flex;
    }
    p{
      width:50%;
    }
    span{
      display:flex;
      justify-content:center;
      color:red;
    }
  }

  .listas{
    display:flex;
    flex-direction: row;
    justify-content:space-evenly;
  }
`

const GerenciarCurso = () => {
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [erro, setErro] = useState('')

  const validarDatas = () => {
    if (new Date(date2) <= new Date(date1)) {
      setErro('A data de conclusão deve estar no futuro')
    } else {
      setErro('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validarDatas()
  }

  return (<>
    <Header />
    <MainStyled>
      <h1>Criar Cursos</h1>
      <form onSubmit={handleSubmit}>
        <div className="basico">
          <Input type='text' required placeholder='Nome do Curso' />
          <Input type='text' placeholder='Descrição' required />
          <div className="data_text">
            <p>Data de Inicio</p>
            <p>Data de Conclusão</p>
          </div>
          <div>
            <Input
              type='date'
              value={date1}
              onChange={e => { setDate1(e.target.value) }}
              required />
            <Input
              type='date'
              value={date2}
              onChange={e => { setDate2(e.target.value) }}
              required />
          </div>
          {erro && <span>{erro}</span>}
        </div>
        <MenuSuspenso
          label="Selecione as Aulas"
          db="leasson"
          value="a"
          required
        />
        <CampoBusca/>
        <Button onClick={'submit'}>Salvar</Button>
      </form>
    </MainStyled>
    <Footer />
  </>)
}

export default GerenciarCurso