
import { HStack, Link, Text } from "@chakra-ui/react";
import { Div } from "../jss"
import { Navs } from "../model"

interface NavBarProps {
  navs: Navs[];
  onNavClick: (id: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ navs, onNavClick }) => {
  return (
    <>
      <HStack wrap='wrap' gap='10' >
        {navs && navs.map((nav) => (
          <Div key={nav.value} onClick={() => onNavClick(nav.value)}>
            <Link colorPalette='teal'>
              <Text textStyle="lg">
                {nav.label}
              </Text>
            </Link>
          </Div>
        ))}
      </HStack>

    </>
  )
}

export default NavBar