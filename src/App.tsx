import NavBar from './components/navbar';
import supabase from '../utils/supabase';
import { useEffect, useState } from 'react';
import { Data, Navs } from './model';
import { Flex, IconButton } from '@chakra-ui/react';
import { useColorMode } from "./components/ui/color-mode";
import { LuMoon, LuSun } from 'react-icons/lu';
import { DialogActionTrigger, DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from './components/ui/dialog';

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
      <HStack gap='14'>
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