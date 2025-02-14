import NavBar from './components/navbar';
import supabase from '../utils/supabase';
import { useEffect } from 'react';
import { Data, Navs } from './model';
import { Button, Flex, IconButton } from '@chakra-ui/react';
import { useColorMode } from "./components/ui/color-mode";
import { LuMoon, LuSun } from 'react-icons/lu';
import AddLinkModal from './components/addLinkModal';
import AddGrupoModal from './components/addGrupoModal';
import DataList from './components/DataList';
import React from 'react';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [navs, setNavs] = React.useState<Navs[]>([]);
  const [dataAll, setDataAll] = React.useState<Data[]>([]);
  const { toggleColorMode, colorMode } = useColorMode();

  useEffect(() => {
    fetchDataAll();
    fetchNavs();
    getSession();
  }, []);

  const getSession = async () => {
    if (authenticated)
      return;

    const {
      data: { session }
    } = await supabase.auth.getSession();

    setAuthenticated(!!session);
  }

  const fetchDataAll = async () => {
    const { data, error } = await supabase.from('links').select();
    if (error) {
      console.log("Error fetching:", error);
    } else {
      setDataAll(data);
    }
  };

  const fetchNavs = async () => {
    const { data, error } = await supabase.from('nav').select();
    if (error)
      console.log("Error fetching nav: ", error)
    else {
      setNavs(data)
    }
  }

  const handleNavClick = async (id: string) => {
    const { data, error } = await supabase.from('links').select().eq("nav", id);
    if (error)
      console.log("Error fetching nav: ", error)
    else {
      setDataAll(data)
    }
  };

  return (
    <>
      <Flex gap='5' >
        <NavBar navs={navs} onNavClick={handleNavClick} />
        <AddLinkModal navs={navs} authenticated={authenticated} />
        <AddGrupoModal navs={navs} authenticated={authenticated} />
        <Button variant='outline'><Link to={'/login'}>Login</Link></Button>
        <IconButton onClick={toggleColorMode} variant="outline" size="sm"> {colorMode === "light" ? <LuSun /> : <LuMoon />} </IconButton>
      </Flex >
      <DataList dataAll={dataAll} authenticated={authenticated} />
    </>
  );
}

export default App;