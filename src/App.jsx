import { getFromApi, postToApi } from "./Context/ConectAPI.jsx";
import GerenciarCurso from "./Pags/GerenciarCurso.jsx";
import GerenciarAula from "./Pags/GerenciarAula.jsx";
import DetalhesCurso from "./Pags/DetalhesCurso.jsx";
import { useAuth } from "./Context/AuthContext.jsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pags/Dashboard.jsx";
import Missing from "./Pags/Missing.jsx";
import Login from "./Pags/Login.jsx";

async function fetchAndSaveUser() {
  const existingUsers = await getFromApi("users");

  if (existingUsers.length > 0) {
    return
  }
  const res = await fetch("https://randomuser.me/api/?results=10&inc=name,login,picture,email&password=upper,lower,6-10");
  const data = await res.json();

  const users = data.results.map((user, i) => ({
    id: i + 1,
    name: user.name.first + " " + user.name.last,
    email: user.email,
    password: user.login.password,
    picture: user.picture.medium
  }));

  for (const user of users) {
    await postToApi("users", user);
  }
}

function App() {
  fetchAndSaveUser()
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/detalhes/:id" element={<DetalhesCurso />}></Route>
      <Route path="/aulas/:id?" element={user ? <GerenciarAula /> : <Missing />}></Route>
      <Route path="/cursos/:id?" element={user ? <GerenciarCurso /> : <Missing />}></Route>
      <Route path="*" element={<Missing />}></Route>
    </Routes>
  );
}

export default App;
