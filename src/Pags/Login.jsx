import logo from "@/assets/logo.png"
import styled from "styled-components"
import Input from "../Components/Input"
import Button from "../Components/Button"
import { useAuth } from "../Context/AuthContext"
import { useState } from "react"

const LoginStyled = styled.main`
  display: flex;
  flex-direction: row;
  height: 100svh;

  .login_cover {
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 50%;
  }
`

const FormStyled = styled.form`
  width: 50%;
  display: flex;
  position: relative;
  flex-direction: column;
  background: var(--cor3);
  border-bottom-left-radius: 50%;
  justify-content: center;
  gap: 18px;
`

const MsgStyled = styled.p`
  width: 250px;
  display: flex;
  background: red;
  justify-content: center;
  
  padding: 20px;
  margin-top:20px;
  font-size: 18px;
  border-radius: 5px;

  top: 0;
  left: 0;
  position: absolute;

  transform: translateX(-50%);
`

const Login = () => {
  console.log("pre-render");
  
  const { login } = useAuth()
  const [input, setInput] = useState({ email: "", password: "" })

  const handleChange = (e) => {
    setInput((prev =>({
      ...prev,
      [e.target.type]: e.target.value
    })))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    await login(input)
  }

  return (
    <LoginStyled>
      {console.log("render")}
      <div className="login_cover">
        <img src={logo} width={'200px'} />
        <h1>Course Sphere</h1>
      </div>
      <FormStyled className="login_form" onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='Email'
          onChange={handleChange}
          required />
        <Input
          type='password'
          placeholder='Senha'
          onChange={handleChange}
          required />
        <Button onClick='submit'>Login</Button>
      </FormStyled>
    </LoginStyled>
  )
}

export default Login
