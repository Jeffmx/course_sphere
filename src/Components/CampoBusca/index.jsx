import filter from "@/assets/filter.svg"
import styled from "styled-components";
import Input from "../Input";
import { useState } from "react";

const BuscaStyled = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;

  input {
    width: 100%;
  }
`

const CampoBusca = () => {
  const [search, setSearch] = useState()

  return (
    <BuscaStyled>
      <Input
        type='text'
        value={search}
        onChange={e => { setSearch(e.target.value) }}
        placeholder="Buscar..."
      />
      <img className="img_icon" src={filter} />
    </BuscaStyled>
  )
}

export default CampoBusca