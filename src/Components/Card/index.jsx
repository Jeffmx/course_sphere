import styled from "styled-components"
import { Link } from 'react-router-dom';

const CardStyled = styled.div`
  width: 360px;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  border-radius: 15px;
  background: var(--cor3);
  
  .tittle, .desc, .date{
    padding: 10px;
    width: 100%;
    text-overflow: ellipsis;
  }

  .tittle{
    font-size: 27px;
  }

  .desc{
    display: flex;
    font-size: 15px;

    div{
      width: 75%;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .dates{
      width: 25%;
      font-size: 13px;
      align-self: flex-end;
      text-align: right;
    }
   }

`

const Card = ({ id, name, description, start_date, end_date }) => {
  return (
    <Link to={`/detalhes/${id}`}>
      <CardStyled>
        <p className="tittle">{name}</p>
        <div className="desc">
          <div><p>{description}</p></div>
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
