import { Link } from "react-router-dom"
import { Nav } from "./jss"

const NavBar = () => {
  return (
    <Nav>
      <li>
        <Link to="/noticias">Notícias</Link>
      </li>
      <li>
        <Link to="/games">Games</Link>
      </li>
      <li>
        <Link to="/saude">Saúde</Link>
      </li>
      <li>
        <Link to="/ti">Ti</Link>
      </li>
    </Nav>
  )
}

export default NavBar