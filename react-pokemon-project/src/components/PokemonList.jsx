import { PokemonContext } from "../context/pokemon.context";
import GetForm from "./GetForm";
import PokemonCard from "./PokemonCard";
import { useContext, useEffect, useState } from 'react'

export default function PokemonList({handleSelected, handleSelected2}) {

  const {pokemons, setPokemons} = useContext(PokemonContext)
  
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(10)

  // useEffect(()=>{
  //   getPokemons(1, 10)
  // }, [])

  //funcion que hace la peticion del pokemon a la api
  const fetchPokemon =  async (index) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    const data = await response.json()

    return data
  }

  //funcion que guarda en el state "pokemons", una cantidad determinada (quantity) de pokemon 
  const getPokemons = async (from, to) => {
    const pokemonsArr = []
    for (let i = from; i <= to; i++) {
      const pokemon = await fetchPokemon(i)
      pokemonsArr.push(pokemon)
    }

    setPokemons(pokemonsArr)
  }

  const searchPokemon = async (name) => {
    const searchedPokemon = await fetchPokemon(name)
    setPokemons([searchedPokemon])
  }
  
  return (
    <div className="">
      <GetForm
        getPokemons={getPokemons}
        searchPokemon={searchPokemon}
      />
      <div className="p-3 grid grid-cols-4 place-items-center gap-5">
      {
        pokemons.map((pokemon) => 
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            handleSelected={handleSelected}
            handleSelected2={handleSelected2}
          />
        )
      }
      </div>
    </div>
  )
}
