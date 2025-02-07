import NavBar from './components/navbar';
import supabase from '../utils/supabase';
import { useEffect, useRef, useState } from 'react';
import { Data, Navs } from './model';
import Links from './components/Links';
import { Button, ClientOnly, createListCollection, HStack, IconButton, Input, Skeleton, Stack, Table } from '@chakra-ui/react';
import { Field } from './components/ui/field';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText, SelectItemText } from './components/ui/select';
import { useColorMode } from "./components/ui/color-mode";
import { LuMoon, LuSun } from 'react-icons/lu';
import { DialogActionTrigger, DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from './components/ui/dialog';

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
      <HStack gap='14'>
        <NavBar navs={navs} onNavClick={handleNavClick} />


        <HStack>
          <DialogRoot trapFocus={false}>
            <DialogBackdrop />
            <DialogTrigger asChild>
              <Button variant='outline'>Novo link</Button>
            </DialogTrigger>
            <DialogContent ref={contentRef}>
              <DialogCloseTrigger />
              <form id='linkForm' onSubmit={addLink}>
                <DialogHeader>
                  <DialogTitle>Adicionar link</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Stack>
                    <Field label="Title">
                      <Input variant='subtle' type="text" placeholder='Digite o title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Field>
                    <Field label="Link">
                      <Input variant='subtle' type="text" placeholder='Digite o link' value={link} onChange={(e) => setLink(e.target.value)} />
                    </Field>
                    <Field label="Grupo">
                      <SelectRoot form='linkForm' collection={navsAllCollection} value={value} key='subtle' variant='subtle' onValueChange={(e) => setValue(e.value)}		>
                        <SelectTrigger >
                          <SelectValueText placeholder='Select grupo' />
                        </SelectTrigger>
                        <SelectContent portalRef={contentRef}>
                          {navsAllCollection.items.map((nav, index) => (
                            <SelectItem key={index} item={nav}>
                              <SelectItemText>
                                {nav.label}
                              </SelectItemText>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                    </Field>
                  </Stack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant='outline'>Cancel</Button>
                  </DialogActionTrigger>
                  <Button type='submit'>Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </DialogRoot>
        </HStack>
        <Stack>
          <DialogRoot>
            <DialogTrigger asChild>
              <Button>Novo grupo</Button>
            </DialogTrigger>
            <DialogContent>
              <form id='grupoForm' onSubmit={addGrupo}>
                <DialogHeader>
                  <DialogTitle>Adicionar grupo</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Stack>
                    <Field label="Nome">
                      <Input variant='subtle' type="text" placeholder='Digite o nome' value={grupo} onChange={(e) => setGrupo(e.target.value)} />
                    </Field>
                  </Stack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant='outline'>Cancel</Button>
                  </DialogActionTrigger>
                  <Button type='submit'>Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </DialogRoot>
        </Stack>
        <ClientOnly fallback={<Skeleton boxSize="8" />}>
          <IconButton onClick={toggleColorMode} variant="outline" size="sm">
            {colorMode === "light" ? <LuSun /> : <LuMoon />}
          </IconButton>
        </ClientOnly>
      </HStack >



      <Table.Root size='md' interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Link</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dataAll && dataAll.map((data) => (
            <Table.Row key={data.id}>
              <Table.Cell>
                <Links title={data.title} link={data.link} deleteLink={deleteLink} id={data.id} created_at={data.created_at} />
              </Table.Cell>
              <Table.Cell>
                <DialogRoot role='alertdialog'>
                  <DialogTrigger asChild>
                    <Button>
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Excluir link</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                      <p>
                        Deseja realmente excluir?
                      </p>
                    </DialogBody>
                    <DialogFooter>
                      <DialogActionTrigger asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogActionTrigger>
                      <Button colorPalette='red' onClick={() => deleteLink(data.id)}>Excluir</Button>
                    </DialogFooter>
                    <DialogCloseTrigger />
                  </DialogContent>
                </DialogRoot>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

export default App;