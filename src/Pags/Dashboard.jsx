import Header from "../Components/Header"
import Footer from "../Components/Footer"
import CardConteiner from "../Components/CardConteiner"

const Dashboard = () => {
  return (<>
    <Header/>
    <main>
      <CardConteiner type='Cursos'/>
      <CardConteiner type='Colaborações'/>
    </main>
    <Footer/>
  </>)
}

export default Dashboard