import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import remove from '@/assets/remove.svg'
import edit from '@/assets/edit.svg'
import { removeFromApi } from "@/Context/ConectAPI"

const CardStyled = styled.div`
  width: 340px;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  border-radius: 15px;
  background: var(--cor3);
  
  .title, .desc, .date{
    padding: 10px;
    width: 100%;
    text-overflow: ellipsis;
  }

  .title{
    font-size: 1.3rem;
  }

  .top-card{
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;

    img{
      margin-right: 10px;
      cursor: pointer;
    }
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

const Card = ({ i, db, id, type, name, description, start_date, end_date }) => {
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (window.confirm("Você tem certeza que deseja excluir este item?")) {
      try {
        await removeFromApi(db, id)
        window.location.reload()
      } catch (error) {
        console.error("Erro ao remover o item:", error)
      }
    }
  }

  const irPara = (e, destino) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(destino)
  }

  return (
    <div>
      <CardStyled key={i} onClick={(e) => db=='leasson' ?
        irPara(e, `/aulas/${id}`) :
        irPara(e, `/detalhes/${id}`)
        }>

        <div className="top-card">
          <p className="title">{name}</p>
          <img src={remove} width={'25px'} onClick={handleDelete} />
          <img src={edit} width={'25px'} onClick={(e) => irPara(e, `/${type}/${id}`)} />
        </div>
        <div className="desc">
          <div><p>{description}</p></div>
          <div className="dates">
            <p>{start_date}</p>
            <p>{end_date}</p>
          </div>
        </div>
      </CardStyled>
    </div>
  )
}

export default Card
