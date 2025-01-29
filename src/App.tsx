import './App.css';
import NavBar from './components/navbar';
import supabase from '../utils/supabase';
import { useEffect, useState } from 'react';
import { Data, Navs } from './model';
import Links from './components/Links';
// import DataList from './DataList';

function App() {
  const [navs, setNavs] = useState<Navs[]>([])
  const [navId, setNavId] = useState<number>()
  const [grupo, setGrupo] = useState<string>()
  const [dataAll, setDataAll] = useState<Data[]>([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchDataAll();
    fetchNavs();
    // fetchNav()
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
      // console.log(data)
      setNavs(data)
    }
  }

  const handleNavClick = async (id: number) => {
    setNavId(id);

    const { data, error } = await supabase.from('links').select().eq("nav", id);
    if (error)
      console.log("Error fetching nav: ", error)
    else {
      // console.log(data)
      setDataAll(data)
    }
  };

  const addLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLink = {
      title: title,
      link: link,
      nav: navId
    };
    const { error } = await supabase.from("links").insert([newLink]);
    if (error) {
      console.log("Error", error);
    } else {
      window.location.reload()
      // fetchDataAll();
      // setTitle("");
      // setLink("");
      // setGrupo(undefined)
    }
  };

  const addGrupo = async (e: React.FormEvent) => {
    e.preventDefault();
    const newGrupo = {
      name: grupo
    };
    const { error } = await supabase.from("nav").insert([newGrupo]);
    if (error) {
      console.log("Error: ", error)
    } else {
      // setGrupo(grupo)
      window.location.reload()
    }
  }

  const deleteLink = async (id: number) => {
    const { error } = await supabase.from("links").delete().eq("id", id);
    if (error)
      console.log("Error: ", error)
    else {
      window.location.reload()
      // fetchDataAll();
    }
  }

  const handleNavChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setNavId(selectedId);
  };

  return (
    <>
      <NavBar navs={navs} onNavClick={handleNavClick} />
      <form id='grupoForm' onSubmit={addGrupo}>
        <input type="text" placeholder='Grupo' value={grupo} onChange={(e) => setGrupo(e.target.value)} />

        <button>Criar grupo</button>
      </form>

      <form id='linkForm' onSubmit={addLink}>
        <input
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder='Link'
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <select value={navId || ""} onChange={handleNavChange}>
          <option value="" disabled>Grupo</option>
          {navs && navs.map((nav) => (
            <option key={nav.id} value={nav.id}>
              {nav.name}
            </option>
          ))}
        </select>
        <button >Criar</button>

      </form>

      {dataAll && dataAll.map((data) => (
        <div key={data.id}>
          <Links title={data.title} link={data.link} deleteLink={deleteLink} id={data.id} created_at={data.created_at} />
        </div>
      ))}
      {/* <div>
        <NavBar navs={navs} onNavClick={handleNavClick} />
        <DataList data={dataAll} />
      </div> */}
    </>
  );
}

export default App;