import styled from "styled-components"

const UlStyled = styled.ul`
  width: 100%;
  display:flex;
  flex-direction: column;

  li{
    width: 100%;
    padding: 10px;
    padding-left: 20px;
    background: gray;
    margin-bottom: 10px;
    border-radius: 15px;
  }
`

const ListMaker = ({ children }) => {
  return (<>
    <UlStyled>
      <li>{children}</li>
    </UlStyled>
  </>)
}

export default ListMaker