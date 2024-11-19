import blackLogo from "../../assets/logo-black.svg"

export default function header() {

    return(
        <div className="header">
        <img src={blackLogo}></img>
        <ul className="Header_nav">
            <li className="Header_item"><a href="">Characters</a></li>
            <li className="Header_item"><a href="">Locations</a></li>
            <li className="Header_item"><a href="">Episodes</a></li>
        </ul>
        </div>
    )
}