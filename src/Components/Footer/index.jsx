import logo from "@/assets/logo.png"
import styled from "styled-components"

const FooterStyled = styled.footer`
  width: 100%;
  height: 15svh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background: var(--cor3);

  h3{
    gap: 8px;
    display: flex;
    align-items: center;
  }
`

const Footer = () => {
  return (
    <FooterStyled>
      <h3>Course <img className="logo" src={logo}></img> Sphere</h3>
    </FooterStyled>
  )
}

export default Footer