import styled from "styled-components"
import { useYoutubeID } from "@/Hooks/YoutubeID"

const UlStyled = styled.ul`
  width: 100%;
  display:flex;
  flex-direction: column;

  li{
    width: 100%;
    height: 50px;
    padding: 10px;
    padding-left: 20px;
    background: gray;
    margin-bottom: 10px;
    border-radius: 15px;
  }

  .video_aula {
    gap: 10px;

    img{
      object-fit: cover;
      object-position: center;
      width: 130px;
      height: 50px;
      border-radius: 15px;
      border: 2px solid #ef4223;
    }
  }

  .instructors{
    gap: 10px;
    margin-top: 10px;
    align-items: center;
    width: 50%;

    img{
      width: 50px;
      height: 50px;
      border-radius: 50px;
      border: 2px solid #ef4223;
    }

    p{
      width: 100%;
    }
  }

  @media (max-width: 768px) {  
    .video_aula img{
      display: none;
    }
  }
`

const ListMaker = (props) => {

  const id = useYoutubeID(props.video)
  
  const handleClick = (e) => {
    e.preventDefault()
    return props.destaque(id)
  }

  return (<>
    <UlStyled>
      {props.children &&
        <div className="video_aula" onClick={handleClick}>
          <img src={`https://img.youtube.com/vi/${useYoutubeID(props.video)}/hqdefault.jpg`} />
          <li>{props.children}</li>
        </div>
      }

      {props.picture &&
        <div className="instructors">
          <img src={props.picture} />
          <p>{props.name}</p>
        </div>
      }
    </UlStyled>
  </>)
}

export default ListMaker