import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFromApi } from "./ConectAPI";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async ({ email, password }) => {
    const users = await getFromApi('users')
    const found = users.find((u) => u.email === email && u.password === password)

    if (!found) {
      return alert("Email ou Senha Inválidos")
    }

    localStorage.setItem("user", JSON.stringify(found))
    setUser(found)
    navigate("/")
    
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
