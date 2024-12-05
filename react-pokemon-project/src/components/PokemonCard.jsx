// import { useEffect, useState } from "react"

export default function PokemonCard({pokemon, handleSelected}) {

    // es posible que se trate de acceder a una propiedad que no existe (ya que la llamada a la api tardará un tiempo)
    return (
        pokemon.id ? (
            <div className="flex flex-col justify-center items-center p bg-teal-800 text-white rounded-md p-3 cursor-pointer border-black border-2 hover:bg-slate-400 transition-all" onClick={() => handleSelected(pokemon)}>
                <h2 className="text-xl mb-2 capitalize">{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt="img pokemon" className="border w-32 bg-slate-300 rounded-md" />
                <span className="font-bold">HP: {pokemon.stats[0].base_stat}</span>
            </div>
        ): (
            <p>Loading...</p>
        )
    )
}
