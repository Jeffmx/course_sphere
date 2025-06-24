import styled from "styled-components"

const InputStyled = styled.input`
  margin: 0 20%;
  padding: 20px;
  font-size: 27px;
  background: var(--cor1);
  border-radius: 10px;
  color: black;
  outline:none;
  border: none;
`

const Input = (props) => {
  return (
    <InputStyled
      type={props.type}
      onInvalid={e => {
        if (props.type === "email") {
          e.target.setCustomValidity("Insira um email válido");
        }
      }}
      placeholder={props.placeholder}
      onInput={e => e.target.setCustomValidity("")}
      onChange={props.onChange}
      value={props.value}
      required={props.required}
    >
    </InputStyled>
  )
}

export default Input