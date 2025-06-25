import Header from "../Components/Header"
import Footer from "../Components/Footer"
import CardConteiner from "../Components/CardConteiner"
import styled from "styled-components"

const MainStyled = styled.main`
  gap:72px;
  display:flex; 
  min-height: 75svh;
  align-items:center;
  flex-direction:column;
  justify-content:center;
`

const Dashboard = () => {
  return (<>
    <Header />
    <MainStyled>
      <CardConteiner nome='Cursos' db='course'/>
      <CardConteiner nome='Aulas' db='leasson'/>
    </MainStyled>
    <Footer />
  </>)
}

export default Dashboard