import { useState } from 'react'
import './App.css'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'


function App() {

  const [selectedPokemon, setSelectedPokemon] = useState([])

  // console.log(selectedPokemon)
  return (
    <>
      {
        selectedPokemon.length !== 0 && 
          <div className=''>
            <h2 className="text-xl mb-2">Pokemon Seleccionado</h2>
             <PokemonDetails 
              pokemon={selectedPokemon}
             />
          </div>
        
      }
      
     <h2 className="text-2xl m-5">Pokemon List</h2>
     <PokemonList
      handleSelected={setSelectedPokemon}
     />

    </>
  )
}

export default App
