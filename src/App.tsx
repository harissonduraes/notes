import './App.css'
import { Route, Routes } from 'react-router-dom'
import Games from './links/games'
import Noticias from './links/noticias'
import Saude from './links/saude'
import Ti from './links/ti'
import data from './data.json'
import NavBar from './navbar'

function App() {
  const noticias = data.noticias;
  const games = data.games;
  const saude = data.saude;
  const ti = data.ti;

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/noticias' element={<Noticias noticias={noticias} />} />
        <Route path='/games' element={<Games games={games} />} />
        <Route path='/saude' element={<Saude saude={saude} />} />
        <Route path='/ti' element={<Ti ti={ti} />} />
      </Routes>
    </>
  )
}

export default App
