import blackLogo from "../../assets/logo-black.svg"
import { Link } from "react-router-dom"

export default function header() {

    return(
        <div className="header">
        <a href="/"><img src={blackLogo}></img></a>
        <ul className="Header_nav">
            <li className="Header_item"><Link to="/">Characters</Link></li>
            <li className="Header_item"><Link to="/locations">Locations</Link></li>
            <li className="Header_item"><Link to="/episodes">Episodes</Link></li>
        </ul>
        </div>
    )
}