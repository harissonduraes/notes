import { Link } from "react-router-dom"
import { Div, Nav } from "../jss"
import starLogo from "../assets/star.svg"
import { Navs } from "../model"

interface NavBarProps {
  navs: Navs[];
  onNavClick: (id: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({ navs, onNavClick }) => {
  return (
    <Nav>
      {navs && navs.map((nav) => (
        <Div key={nav.id} onClick={() => onNavClick(nav.id)}>
          <img src={starLogo} className="logo react" />
          <Link to={"/" + nav.name}>{nav.name}</Link>
        </Div>
      ))}

      {/* <Div>
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
      </Div> */}
    </Nav>
  )
}

export default NavBar