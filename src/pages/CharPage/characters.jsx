import CharacterFilter from "../../components/CharacterFilter/characterFilter";
import logo from "../../assets/logo.svg";

export default function Characters() {
   return(
    <>
    <div className="main-logo">
    <img src={logo}></img>
    </div>
<CharacterFilter/>
    </>
    )
}