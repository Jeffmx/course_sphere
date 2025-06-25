import logo from "@/assets/logo.png"
import styled from "styled-components"
import UserLoged from "../UserLoged"

const HeaderStyled = styled.header`
  min-width: 70%;
  min-height: 10svh;
  display: flex;
  justify-self: center;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  text-shadow: 0 0 15px black;
  
  .header_Conteiner {
    gap: 18px;
    display: flex;
    align-items: center;
  }

  @media (max-width: 425px) {
    h3, a{
      font-size: 0.8rem;
    }
  }
`

const Header = () =>{
  return(
    <HeaderStyled>
      <div className="header_Conteiner">
        <img className="logo" src={logo}></img>
        <h3>Course Sphere</h3>
      </div>
      <nav className="header_Conteiner">
        <a href="/aulas">Aulas</a>
        <a href="/cursos">Cursos</a>
        <a href="/">Dashboard</a>
        <UserLoged/>
      </nav>
    </HeaderStyled>
  )
}

export default Header