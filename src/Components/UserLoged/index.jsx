import { useAuth } from "@/Context/AuthContext"
import userIcon from "@/assets/user.svg"
import styled from "styled-components"
import { useState } from "react"
import Button from "../Button"

const UserStyled = styled.figure`
  position:relative;
  width: 50px;
  height: 50px;
  border-radius:50%;
  border: 3px solid #ef4223;
  background: url(${props => props.$bg});
  background-size: contain;
`
const InfoStyled = styled.div`
  position: absolute;
  width: 200px;
  right: 0;

  display:flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  
  margin-top: 60px;
  padding: 20px 30px;
  border-radius: 25px;
  background: var(--cor3);

  img{
    border-radius: 50%
  }
  button{
    font-size: 18px;
    padding: 10px 30px;
  }
`

const UserLoged = () => {
  const { user, logout } = useAuth()
  const [view, setView] = useState()

  const toggle = () => {
    setView(prev => !prev)
  }

  if (!user) {
    return (
      <a href="/login"><img src={userIcon} width={'50px'} /></a>
    )
  } else {
    return (
      <UserStyled $bg={user.picture} onClick={toggle}>
        {view && (
          <InfoStyled>
            <p>Seja bem-vindo<br />{user.name}</p>
            <img src={user.picture} />
            <Button onClick={() => {logout()}}>Logout</Button>
          </InfoStyled>
        )}
      </UserStyled>
    )
  }
}
export default UserLoged