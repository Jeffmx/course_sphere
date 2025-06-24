import { useEffect, useState } from "react";
import styled from "styled-components";

const MenuStyled = styled.div`
  width: 100%;
  display: grid;
  align-content:flex-start;
`
const LabelStyled = styled.label`
  font-size: 18px;
`
const SelectStyled = styled.select`
  font-size: 18px;
  padding: 18px 9px;
  box-sizing: border-box;
  border-radius: 20px;
  appearance: none;

  option{
    color:#000000;
  }
`

const MenuSuspenso = (props) => {
  const [dados, setDados] = useState([])

  useEffect(() => {
    const db = async () => {
      try {
        const res = await fetch(`http://localhost:3000/${props.db}`)
        const lesson = await res.json()
        setDados(lesson);
      } catch (err) {
        console.error("deu ruim", err);
      }
    }
    db()
  }, [props.db])

  return (
    <MenuStyled>
      <LabelStyled>{props.label}</LabelStyled>
      <SelectStyled
        required={props.required}
        value={props.valor}
      >
        <option></option>
        {dados.map(d => <option >{props.db !== "status" ? d.name : d}</option>)}
      </SelectStyled>
    </MenuStyled>
  )
}

export default MenuSuspenso