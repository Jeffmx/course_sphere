import { useEffect, useState } from "react";
import styled from "styled-components";
import { getFromApi } from "@/Context/ConectAPI";

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
    const buscarDados = async () => {
      try {
        setDados(await getFromApi(props.db));
      } catch (err) {
        console.error("deu ruim", err);
      }
    }
    buscarDados()
  }, [props.db])
  
  return (
    <MenuStyled>
      <LabelStyled>{props.label}</LabelStyled>
      <SelectStyled
        onChange={props.onChange}
        required={props.required}
        value={props.value}
      >
        <option key={0}></option>
        {dados.map((d,i) => <option key={i} value={props.db !== "status" ? d.name : d}>
          {props.db !== "status" ? d.name : d}
          </option>
        )}
      </SelectStyled>
    </MenuStyled>
  )
}

export default MenuSuspenso