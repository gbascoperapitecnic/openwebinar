import { Link } from "react-router-dom"
import DetailsWrapper from "../hoc/DetailsWrapper"

function PokemonDetails2(props) {

    const {pokemon, likes, increaseLikes} = props

    return (
        <div className='border p-2 rounded-md border-black flex flex-col items-center'>
            <h2 className="text-xl mb-2 capitalize">{pokemon.name}</h2>
            <span>Likes: {likes}</span>
            <img 
                src={pokemon.sprites.front_default} 
                alt="img pokemon" 
                className="border w-32 bg-slate-300 rounded-md" 
            />
            <span className="font-bold">HP: {pokemon.stats[0].base_stat}</span>
            <button className="border rounded-full py-2 px-6 mt-3" onClick={increaseLikes}>Like</button>

            
            <Link to={`/pokemons/${pokemon.id}`} className="border rounded-md px-5 py-2 mt-4">Ver detalles</Link>
        </div>
    )
}

export default DetailsWrapper(PokemonDetails2)