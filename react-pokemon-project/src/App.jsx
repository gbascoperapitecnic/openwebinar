
import './App.css'
import {Route, Routes} from "react-router-dom"
import HomePage from './pages/HomePage'
import PokemonsPage from './pages/PokemonsPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/pokemons' element={<PokemonsPage/>} />
    </Routes>
  )
}

export default App
