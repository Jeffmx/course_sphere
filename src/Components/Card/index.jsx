import styled from "styled-components"
import { Link } from 'react-router-dom';

const CardStyled = styled.figure`
  width: 360px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;

  background: url(${props => props.$bg});
  background-size: contain;
  background-position: center;
  border-radius: 15px;
  
  .tittle, .desc, .date{
    padding: 10px;
    display: flex;
    width: 100%;
    background: var(--cor3);
  }

  .tittle{
    border-radius: 15px 15px 0 0;
    font-size: 27px;
  }

  .desc{
    border-radius: 0 0 15px 15px;
    justify-content: space-between;
    font-size: 18px;
    max-height: 130px;
  }

  .dates{
    font-size: 13px;
    align-self: flex-end;
  }
`

const Card = ({ link, name, description, start_date, end_date }) => {
  return (
    <Link to={`/detalhes/${link}`}>
      <CardStyled $bg={`https://img.youtube.com/vi/${link}/hqdefault.jpg`}>
        <p className="tittle">{name}</p>
        <div className="desc">
          <p>{description}</p>
          <div className="dates">
            <p>{start_date}</p>
            <p>{end_date}</p>
          </div>
        </div>
      </CardStyled>
    </Link>
  )
}

export default Card
