import { Link, useParams } from 'react-router-dom'
import { getFromApi } from "../Context/ConectAPI"
import { useAuth } from "../Context/AuthContext"
import ListMaker from "../Components/ListMaker"
import { useEffect, useState } from 'react'
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import styled from "styled-components"

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 72px;

  .titulo{
    font-size:2rem;
    width: 70%;
    margin-bottom: -50px;
  }

  .video{
    width: 70%;
    display:flex;
    border-radius: 13px;
    aspect-ratio: 4/2.25;
    box-shadow: 0 0 50px 2px black;
  }

  .info_curso {
    flex-direction: column;
    display:flex;
    gap:30px;
    width: 70%;
    padding: 50px;
    border-radius: 13px;
    margin-bottom: 50px;
    background: var(--cor3);
    
    div{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`

const DetalhesCurso = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [curso, setCurso] = useState(null)
  const [aula, setAula] = useState(null)

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        var data = await getFromApi(`course/?id=${id}`)
        setCurso(data[0])
        setAula(await getFromApi(`leasson/?course_id=${id}&status=Published`))

      } catch (err) {
        console.error("Algo deu errado", err)
      }
    }

    fetchCurso()
  }, [id])

  if (!curso || !aula) return <p>Carregando...</p>

  return (<>
    <Header />
    <MainStyled>
      <h1 className="titulo">{curso.name}</h1>
      <iframe className="video"
        src={`https://www.youtube.com/embed/${curso.course_id}`}
        frameBorder='0'
      />
      <div className="info_curso">
        <h3>{curso.description}</h3>
        <p>{curso.start_date} - {curso.end_date}</p>
        <div>
          <ul style={{ width: '50%', marginRight: '20px' }}>
            <h2>Aulas</h2>
            {aula.map((aula) => <ListMaker>{aula.name}</ListMaker>)}
          </ul>
          <ul>
            <h2>Instrutores</h2>
            {curso.instructors.map(instructors => <ListMaker>{instructors}</ListMaker>)}
          </ul>
        </div>
      </div>
    </MainStyled>
    <Footer />
  </>)
}

export default DetalhesCurso