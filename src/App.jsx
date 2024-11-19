
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header";
import logo from "./assets/logo.svg";
import Charpage from "./pages/CharPage/charpage";
import Episodes from "./components/Episodes/episodes";

function App() {
  return (
    <>
      <Header/>
      <Routes>
      <Route path="*" element={<h1>Ошибка</h1>}></Route>
      <Route path="/" element={<Charpage/>}></Route>
      <Route path="/episodes" element={<Episodes/>}></Route>
      </Routes>
    </>
  );
}
export default App;
