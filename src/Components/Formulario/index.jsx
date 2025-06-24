import styled from "styled-components";

const FormStyled = styled.form`
  display:flex;
  flex-direction:column;
  padding: 20px;
  gap:20px;
  border: 3px solid var(--cor1);
  border-radius: 27px;
`

const Formulario = ({ children }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <FormStyled onSubmit={handleSubmit}>
      {children}
    </FormStyled>
  )
}

export default Formulario