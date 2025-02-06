import NavBar from './components/navbar';
import supabase from '../utils/supabase';
import { useEffect, useRef, useState } from 'react';
import { Data, Navs } from './model';
import { createListCollection, Flex, IconButton } from '@chakra-ui/react';
import { useColorMode } from "./components/ui/color-mode";
import { LuMoon, LuSun } from 'react-icons/lu';
import AddLinkModal from './addLinkModal';
import AddGrupoModal from './addGrupoModal';
import DataList from './DataList';

function App() {
  const [navs, setNavs] = useState<Navs[]>([])
  const [grupo, setGrupo] = useState<string>()
  const [dataAll, setDataAll] = useState<Data[]>([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [value, setValue] = useState<string[]>([])
  const { toggleColorMode, colorMode } = useColorMode();
  const contentRef = useRef<HTMLDivElement>(null)

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

  const addLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLink = {
      title: title,
      link: link,
      nav: value.toString()
    };
    const { error } = await supabase.from("links").insert([newLink]);
    if (error) {
      console.log("Error", error);
    } else {
      window.location.reload()
    }
  };

  const addGrupo = async (e: React.FormEvent) => {
    e.preventDefault();

    const findMaxValue = (navs: Navs[]): string => {
      if (navs.length === 0) {
        return '';
      }

      return navs.reduce((max, current) => {
        const maxValue = parseFloat(max.value);
        const currentValue = parseFloat(current.value);

        return currentValue > maxValue ? current : max;
      }).value;
    };

    const maxValue = findMaxValue(navs);
    const newValue = parseFloat(maxValue) + 1;
    console.log("newValue", newValue)

    const newGrupo = {
      value: newValue,
      label: grupo
    };
    const { error } = await supabase.from("nav").insert([newGrupo]);
    if (error) {
      console.log("Error: ", error)
    } else {
      window.location.reload()
    }
  }

  const deleteLink = async (id: number) => {
    const { error } = await supabase.from("links").delete().eq("id", id);
    if (error)
      console.log("Error: ", error)
    else {
      window.location.reload()
    }
  }

  const navsAllCollection = createListCollection<Navs>({
    items: navs
  })
  console.log(navsAllCollection)

  return (
    <>
      <Flex gap='14'>
        <NavBar navs={navs} onNavClick={handleNavClick} />
        <AddLinkModal contentRef={contentRef} addLink={() => addLink} title={title} link={link} value={value} navsAllCollection={navsAllCollection} setTitle={setTitle} setLink={setLink} setValue={setValue} />
        <AddGrupoModal addGrupo={() => addGrupo} grupo={grupo} setGrupo={setGrupo} />
        <IconButton onClick={toggleColorMode} variant="outline" size="sm"> {colorMode === "light" ? <LuSun /> : <LuMoon />} </IconButton>
      </Flex >

      <DataList dataAll={dataAll} deleteLink={deleteLink} />
    </>
  );
}

export default App;