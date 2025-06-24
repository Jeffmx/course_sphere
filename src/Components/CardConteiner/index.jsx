import styled from "styled-components"
import add from "@/assets/add.svg"
import Card from "../Card"

const ConteinerStyled = styled.div`
  gap: 27px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-self: center;
  margin-bottom: 36px;

  .cards{
    display: flex;
    flex-direction: row;
    gap: 18px
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

const CardConteiner = ({ type }) => {

  const handleLink = (link) => {
    const regex =/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  }

  return (
    <ConteinerStyled>
      <div className="type">
        <h1>{type}</h1>
        {type === "Cursos" && (<a href="/Cursos"><img src={add} alt="Adicionar curso" /></a>)}
      </div>
      <ul className="cards">
        <Card
          link={handleLink("https://www.youtube.com/watch?v=RoJvkeFdPyY&list=RDMM&index=27")}
          name="how to gamble"
          description="just win and don't lose, it's that easy peezy lemmon squeezy"
          start_date='12/12/12'
          end_date='13/12/13'
        />
        <Card
          name="how to gamble"
          description="just win and don't lose, it's that easy peezy lemmon squeezy"
          start_date='12/12/12'
          end_date='13/12/13'
        />
      </ul>
    </ConteinerStyled>
  )
}

export default CardConteiner