import { useState } from 'react'

import PokemonList from '../components/PokemonList'
import PokemonDetails from '../components/PokemonDetails'
import PokemonDetails2 from '../components/PokemonDetails2'

export default function PokemonsPage() {
    
  const [selectedPokemon, setSelectedPokemon] = useState([])
  const [selectedPokemon2, setSelectedPokemon2] = useState([])

  // console.log(selectedPokemon)
    return (
        <>
        <h2 className="text-xl mb-2">Pokemon Seleccionado</h2>
        {
          selectedPokemon.length !== 0 && 
            <div className=''>
               <PokemonDetails 
                pokemon={selectedPokemon}
               />
            </div>
        }
        {
          selectedPokemon2.length !== 0 && 
            <div className=''>
               <PokemonDetails2 
                pokemon={selectedPokemon2}
               />
            </div>
        }
        
       <h2 className="text-2xl m-5">Pokemon List</h2>
       <PokemonList
        handleSelected={setSelectedPokemon}
        handleSelected2={setSelectedPokemon2}
       />
  
      </>
    )
}
