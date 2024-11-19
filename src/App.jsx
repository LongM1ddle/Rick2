import { useEffect, useState } from "react";
import "./App.css";
import header from "./components/Header/header";
import logo from "./assets/logo.svg";
import characterFilter from "./components/CharacterFilter/characterFilter";

function App() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  return (
    <>
      {header()}
      <img src={logo}></img>
      {characterFilter()}
    </>
  );
}
export default App;
