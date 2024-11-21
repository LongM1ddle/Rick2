
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header";
import Characters from "./pages/CharPage/characters";
import Episodes from "./components/Episodes/episodes";
import { useNavigate } from "react-router-dom";
import CharacterPage from "./components/CharacterPage/characterPage";

function App() {
  const nav = useNavigate()
  return (
    <>
      <Header/>
      <Routes>
      <Route path="*" element={<h1>Ошибка</h1>}></Route>
      <Route path="/" element={<Characters/>}></Route>
      <Route path="/episodes" element={<Episodes/>}></Route>
      <Route path="/character_page/:id" element={<CharacterPage/>}></Route>
      </Routes>
    </>
  );
}
export default App;
