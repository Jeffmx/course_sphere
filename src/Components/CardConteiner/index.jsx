import Card from "../Card"
import add from "@/assets/add.svg"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "@/Context/AuthContext"
import { getFromApi } from "@/Context/ConectAPI"

const ConteinerStyled = styled.div`
  gap: 27px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-self: center;
  margin-bottom: 36px;

  .cards{
    gap: 18px;
    display: flex;
    overflow-x: auto;
    flex-direction: row;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background-color: #999;
      border: 2px solid transparent;
      background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #666;
    }
  }

  .type{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;

    img{
      width: 25px;
    }
  }
`

const CardConteiner = ({ nome, db }) => {
  const { user } = useAuth();
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (!user) return;

    const buscarCursos = async () => {
      try {
        setContent(await getFromApi(`${db}?creator_id=${user.id}`));
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };

    buscarCursos();
  }, [user, db]);

  return (
    <ConteinerStyled>
      <div className="type">
        <h1>{nome}</h1>
        {user && nome === "Cursos" && (<Link to="/Cursos"><img src={add} alt="Adicionar curso" /></Link>)}
      </div>
      <ul className="cards">
        {user &&
          content.map(
            c =>
              <Card
                id={c.id}
                name={c.name}
                description={c.description}
                start_date={c.start_date}
                end_date={c.end_date}
              />
          )
        }
      </ul>
    </ConteinerStyled>
  )
}

export default CardConteiner