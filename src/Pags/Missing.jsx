import not_found from '@/assets/not_found.svg'
import styled from 'styled-components'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const MainStyled = styled.main`
  width:100%;
  display: flex;
  min-height: 75svh;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  font-size: 1rem;

  img{
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
  }
`

const Missing = () => {
  return (<>
    <Header />
    <MainStyled>
      <img src={not_found}/>
      <h2>Parece que algo deu errado</h2>
      <h2>Ou Você não tem permisão pra entrar ali.</h2>
    </MainStyled>
    <Footer />
  </>)
}

export default Missing