import { getFromApi } from "../Context/ConectAPI"
import ListMaker from "../Components/ListMaker"
import { useParams } from 'react-router-dom'
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

  .ul_Aulas{
    width: 50%; 
    margin-right: 20px;
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

  @media (max-width: 425px) {
    .info_curso {
      padding: 20px;

      div{
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 20px;

      }
      .ul_Aulas{
        width: 90%;
        margin-right: 0;
      }
    }
  }
`

const DetalhesCurso = () => {
  const { id } = useParams()
  const [aula, setAula] = useState(null)
  const [curso, setCurso] = useState(null)
  const [atual, setAtual] = useState(null)
  const [instructors, setInstructors] = useState(null)

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        var data = await getFromApi(`course/${id}`)
        setCurso(data)
        setAula(await getFromApi(`leasson/?course_id=${id}&status=Published`))
        const instructorIds = data.instructors.map(instructor => instructor)
        const instructorsData = await Promise.all(instructorIds.map(id => getFromApi(`users/?id=${id}`)))
        setInstructors(instructorsData.map(i => [i[0].name, i[0].picture]))

      } catch (err) {
        console.error("Algo deu errado", err)
      }
    }

    fetchCurso()
  }, [id])

  if (!curso || !aula || !instructors) return <p>Carregando...</p>

  return (<>
    <Header />
    <MainStyled>
      <h1 className="titulo">{curso.name}</h1>
      <iframe className="video"
        src={`https://www.youtube.com/embed/${atual}`}
      />
      <div className="info_curso">
        <h3>{curso.description}</h3>
        <p>{curso.start_date} - {curso.end_date}</p>
        <div>
          <ul className="ul_Aulas" >
            <h2>Aulas</h2>
            {aula.map((aula) =>
              <ListMaker
                video={aula.video_url}
                destaque={setAtual}
              >
                {aula.name}
              </ListMaker>)}
          </ul>
          <ul>
            <h2>Instrutores</h2>
            {instructors.map(instructors =>
              <ListMaker
                name={instructors[0]}
                picture={instructors[1]}
              />
            )}
          </ul>
        </div>
      </div>
    </MainStyled>
    <Footer />
  </>)
}

export default DetalhesCurso