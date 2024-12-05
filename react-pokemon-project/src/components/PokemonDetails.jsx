
export default function PokemonDetails({pokemon}) {
  return (
    <div className='border p-2 rounded-md border-black flex flex-col items-center'>
        <h2 className="text-xl mb-2 capitalize">{pokemon.name}</h2>
        <img 
            src={pokemon.sprites.front_default} 
            alt="img pokemon" 
            className="border w-32 bg-slate-300 rounded-md" 
        />
        <span className="font-bold">HP: {pokemon.stats[0].base_stat}</span>
    </div>
  )
}
