import styled from "styled-components"

const ButtonStyled = styled.button`
  font-size: 27px;
  padding: 20px;
  border-radius: 5px;
  margin: 0 20%;
`

const Button = ({ onClick, children }) => {
  return (
    <ButtonStyled onClick={onClick === 'submit'? ()=>onClick : onClick}>
      {children}
    </ButtonStyled>
  )
}

export default Button