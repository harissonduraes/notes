
import { Link, Text } from "@chakra-ui/react";
import { Div } from "../jss"
import { Navs } from "../model"

interface NavBarProps {
  navs: Navs[];
  onNavClick: (id: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ navs, onNavClick }) => {
  return (
    <>
      {navs && navs.map((nav) => (
        <Div key={nav.value} onClick={() => onNavClick(nav.value)}>
          <Link colorPalette='teal'>
            <Text textStyle="lg">
              {nav.label}
            </Text>
          </Link>
        </Div>
      ))}

    </>
  )
}

export default NavBar