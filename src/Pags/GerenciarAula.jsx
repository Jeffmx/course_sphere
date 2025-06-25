import MenuSuspenso from "../Components/MenuSuspenso";
import Button from "../Components/Button";
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import Input from "../Components/Input";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useParams } from "react-router-dom";
import { getFromApi, postToApi, updateToApi } from "../Context/ConectAPI";

const MainStyled = styled.main`
  gap: 36px;
  display: flex;
  min-height:75vh;
  min-width: 450px;
  margin: 20px 0px;
  flex-direction: column;
  justify-content: center;
  justify-self: center;

  input{
    margin:0;
    font-size:18px;
  }
  span{
    display:flex;
    justify-content:center;
    color:red;
  }
`
const FormStyled = styled.form`
  display:flex;
  flex-direction:column;
  padding: 20px;
  gap:20px;
  border: 3px solid var(--cor1);
  border-radius: 27px;
`

const GerenciarAula = () => {
  const [name, setName] = useState()
  const [status, setStatus] = useState()
  const [date, setDate] = useState()
  const [link, setLink] = useState()
  const [sucesso, setSucesso] = useState('')
  const [erro, setErro] = useState('')
  const { user } = useAuth()
  const { id } = useParams()

  const validarLink = /^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w\-]+/

  useEffect(() => {
    const fillAula = async () => {
      try {
        const res = await getFromApi(`leasson/${id}`)
        setName(res.name)
        setStatus(res.status)
        setDate(res.published_date)
        setLink(res.video_url)

      } catch (err) {
        console.error("Erro ao carregar curso:", err)
      }
    }

    if (id) fillAula()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name.length < 3) {
      setErro('O nome do curso deve ter pelo menos 3 caracteres')
    } else if (validarLink.test(link)===false) {
      setErro('Insira um link do youtube válido')
    } else {

      const novaAula = {
        name: name,
        status: status,
        publish_date: date,
        video_url: link,
        course_id: '',
        creator_id: user.id,
      }
      
      try {
        if (id) {
          await updateToApi('leasson', id, novaAula)
          setSucesso('Aula atualizado com sucesso!')
        } else {
          await postToApi('leasson', novaAula)
          setSucesso('Aula criado com sucesso!')
        }

        setName('')
        setDate('')
        setStatus('')
        setLink('')
        setErro('')
      } catch (error) {
        setErro('Erro ao criar aula. Tente novamente.')
      }
    }
  }

  return (<>
    <Header />
    <MainStyled>
      <h1>Criar Aula</h1>
      <FormStyled onSubmit={handleSubmit}>
        <Input
          type='text'
          required
          onChange={e => { setName(e.target.value) }}
          value={name}
          placeholder="Titulo" />
        <MenuSuspenso
          label="Status"
          db="status"
          onChange={e => { setStatus(e.target.value) }}
          value={status}
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
        {erro && <span >{erro}</span>}
        {sucesso && <span style={{color:'lime'}}>{sucesso}</span>}
        <Button type='submit'>Salvar</Button>
      </FormStyled>
    </MainStyled>
    <Footer />
  </>)
}

export default GerenciarAula