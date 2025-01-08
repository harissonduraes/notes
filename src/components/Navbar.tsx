import { Link } from "react-router-dom"
import { Nav } from "../jss"

const NavBar = () => {
  return (
    <Nav>
      <Link to="/noticias">Notícias</Link>
      <Link to="/games">Games</Link>
      <Link to="/saude">Saúde</Link>
      <Link to="/ti">TI</Link>
    </Nav>
  )
}

export default NavBar