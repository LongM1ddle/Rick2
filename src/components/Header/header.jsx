import blackLogo from "../../assets/logo-black.svg"

export default function header() {

    return(
        <div className="header">
        <a href="/"><img src={blackLogo}></img></a>
        <ul className="Header_nav">
            <li className="Header_item"><a href="">Characters</a></li>
            <li className="Header_item"><a href="">Locations</a></li>
            <li className="Header_item"><a href="/episodes">Episodes</a></li>
        </ul>
        </div>
    )
}