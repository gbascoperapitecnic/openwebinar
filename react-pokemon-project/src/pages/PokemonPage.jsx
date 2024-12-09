import { useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { MoveLeft, MoveRight } from 'lucide-react';

export default function PokemonPage() {

    const {id} = useParams()
    const [pokemon, setPokemon] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        //cuando cambie el elemento id, hacer el fetch
        fetchPokemon(id)
    }, [id])

    const fetchPokemon = async (id) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const data = await response.json()

            setPokemon(data)
        } catch (error) {
            console.error(error)
            setError(error)
        }
    }

    const navigate = useNavigate()

    const goTo = (id) => {
        navigate(`/pokemons/${id}`)
    }


  return (
    <section className=''>
        {
            error ? (
                <div className='flex flex-col gap-4 items-center min-h-screen justify-center'>
                    <h2>No se ha encontrado ningún pokemon.</h2>
                    <Link to={"/pokemons"} className='rounded-m px-5 py-2 bg-black text-white'>Volver a la lista</Link>
                </div>                
            ): (
                pokemon ? (
                    <div className='rounded-xl flex flex-col justify-center items-center min-h-screen text-xl w-fit mx-auto'>
                        <div className='border rounded-lg p-2'>
                            <h1>{pokemon.name.toUpperCase()}</h1>
                            <img src={pokemon.sprites.front_default} className='w-[200px]'></img>
                            <h3>HP: {pokemon.stats[0].base_stat}</h3>
                            <h3>Attack: {pokemon.stats[1].base_stat}</h3>
                            <h3 className='mb-5'>Defense: {pokemon.stats[2].base_stat}</h3>
    
    
                            <button className='rounded-md p-2 border' onClick={()=> goTo(Number(id) -1)}>{<MoveLeft/>}</button>
                            <button className='rounded-md p-2 border' onClick={()=> goTo(Number(id) +1)}>{<MoveRight/>}</button>
    
    
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            )
        }
    </section>
  )
}
