import { Link } from "react-router-dom"
import { Div, Nav } from "../jss"
import starLogo from "../assets/star.svg"

const NavBar = () => {
  return (
    <Nav>
      <Div>
        <img src={starLogo} className="logo react" />
        <Link to="/noticias">Notícias</Link>
      </Div>
      <Div>
        <img src={starLogo} className="logo react" />
        <Link to="/games">Games</Link>
      </Div>
      <Div>
        <img src={starLogo} className="logo react" />
        <Link to="/saude">Saúde</Link>
      </Div>
      <Div>
        <img src={starLogo} className="logo react" />
        <Link to="/ti">TI</Link>
      </Div>
    </Nav>
  )
}

export default NavBar