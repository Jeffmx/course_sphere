import styled from "styled-components"
import Input from "@/Components/Input"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import Button from "@/Components/Button"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { postToApi } from "@/Context/ConectAPI"
import { useAuth } from "@/Context/AuthContext";
import { getFromApi, updateToApi } from "../Context/ConectAPI"

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
    gap:20px;
    display:flex;
    flex-direction:column;
    border: 3px solid var(--cor1);
    border-radius: 27px;
    padding: 20px;
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
  const [sucesso, setSucesso] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [erro, setErro] = useState('')
  const { user } = useAuth()
  const { id } = useParams()

  useEffect(() => {
    const fillCurso = async () => {
      try {
        const res = await getFromApi(`course/${id}`)
        setTitle(res.name)
        setDesc(res.description)
        setDate1(res.start_date)
        setDate2(res.end_date)

      } catch (err) {
        console.error("Erro ao carregar curso:", err)
      }
    }

    if (id) fillCurso()
  }, [id])


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title.length < 3) {
      setErro('O nome do curso deve ter pelo menos 3 caracteres')
    } else if (desc.length > 500) {
      setErro('A descrição do curso deve ter no máximo 500 caracteres')
    } else if (new Date(date2) <= new Date(date1)) {
      setErro('A data de conclusão deve estar no futuro')
    } else {

      const novoCurso = {
        name: title,
        description: desc,
        start_date: date1,
        end_date: date2,
        creator_id: user.id,
        instructors: [],
      };

      try {
        if (id) {
          await updateToApi('course', id, novoCurso)
          setSucesso('Curso atualizado com sucesso!')
        } else {
          await postToApi('course', novoCurso)
          setSucesso('Curso criado com sucesso!')
        }

        setTitle('');
        setDesc('');
        setDate1('');
        setDate2('');
        setErro('')
      } catch (error) {
        setErro('Erro ao criar curso. Tente novamente.');
      }
    }
  }

  return (<>
    <Header />
    <MainStyled>
      <h1>Criar Cursos</h1>
      <form onSubmit={handleSubmit}>
        <div className="basico">
          <Input
            type='text'
            placeholder='Nome do Curso'
            onChange={e => { setTitle(e.target.value) }}
            value={title}
            required
          />
          <Input
            type='text'
            placeholder='Descrição'
            onChange={e => { setDesc(e.target.value) }}
            value={desc}
            required
          />
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
        <Button onClick={'submit'}>Salvar</Button>
        {sucesso && <span style={{ color: 'lime', alignSelf: 'center' }}>{sucesso}</span>}
      </form>
    </MainStyled>
    <Footer />
  </>)
}

export default GerenciarCurso