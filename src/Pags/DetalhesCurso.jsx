import Header from "../Components/Header"
import Footer from "../Components/Footer"
import styled from "styled-components"
import ListMaker from "../Components/ListMaker"
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from "../Context/AuthContext"
import { getFromApi } from "../Context/ConectAPI"

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 72px;

  .video{
    width: 70%;
    display:flex;
    border-radius: 13px;
    aspect-ratio: 4/2.25;
    box-shadow: 0 0 50px 2px black;
  }

  .dc_coisos {
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
const FigureStyled = styled.figure`
  position: relative;
  width: 100%;
  height: 30svh;
  
  .titulo{
    margin-top: 2%;
    justify-self: center;
    position: relative;
    text-shadow: 0 0 10px black;
  }
  
  &::after{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;

    background: url(${props => props.$img});
    background-position: center;
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
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
        var data = await getFromApi(`course/?course_id=${id}`)
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
    <MainStyled>
      <FigureStyled $img={`https://img.youtube.com/vi/${curso.course_id}/hqdefault.jpg`}>
        <Header />
        <h1 className="titulo">{curso.name}</h1>

        {user && user.id === curso.creator_id &&
          <div style={{ marginLeft: '20px' }}>
            <Link to={'/cursos'} >Editar</Link>
          </div>
        }

      </FigureStyled>
      <iframe className="video"
        src={`https://www.youtube.com/embed/${curso.course_id}`}
        frameBorder='0'
      />
      <div className="dc_coisos">
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