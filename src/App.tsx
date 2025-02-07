import NavBar from './components/navbar';
import supabase from '../utils/supabase';
import { useEffect, useState } from 'react';
import { Data, Navs } from './model';
import { Flex, IconButton } from '@chakra-ui/react';
import { useColorMode } from "./components/ui/color-mode";
import { LuMoon, LuSun } from 'react-icons/lu';
import AddLinkModal from './components/addLinkModal';
import AddGrupoModal from './components/addGrupoModal';
import DataList from './components/DataList';

const App: React.FC = () => {
  const [navs, setNavs] = useState<Navs[]>([])
  const [dataAll, setDataAll] = useState<Data[]>([]);
  const { toggleColorMode, colorMode } = useColorMode();

  useEffect(() => {
    fetchDataAll();
    fetchNavs();
  }, []);

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
        <AddLinkModal navs={navs} />
        <AddGrupoModal navs={navs} />
        <IconButton onClick={toggleColorMode} variant="outline" size="sm"> {colorMode === "light" ? <LuSun /> : <LuMoon />} </IconButton>

      </Flex >

      <DataList dataAll={dataAll} />
    </>
  );
}

export default App;