import { useState } from "react"
import { Link } from "react-router-dom";

export default function GetForm({getPokemons, searchPokemon}) {

    const [from, setFrom] = useState(1)
    const [to, setTo] = useState(10)

    //state search pokemon
    const [search, setSearch] = useState("")


    const handleInputFrom = (e) =>{
        setFrom(e.target.value)
    }
    const handleInputTo = (e) =>{
        setTo(e.target.value)
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        if (e.target.id == "search-pokemon") {
            searchPokemon(search.toLowerCase())
        }else{
            if (from < to) {
                getPokemons(from, to)
            }
        }

    }

    // console.log(from, to)

    return (
        <div className="grid grid-cols-2">
            <form action="" onSubmit={handleSubmit} className="border rounded-md max-w-fit p-5 mx-auto space-y-4 mb-5">
                <fieldset>
                    <label htmlFor="from-pokemon">From: </label>
                    <input type="number" min={1} id="from-pokemon" onChange={handleInputFrom} className="border rounded-md"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="to-pokemon">To: </label>
                    <input type="number" min={2} id="to-pokemon" onChange={handleInputTo} className="border rounded-md"/>
                </fieldset>

                <button className="bg-slate-700 text-white px-4 rounded-full">Enviar</button>
            </form>

            <form action="" className="flex flex-col justify-center border rounded-md max-w-fit p-5 mx-auto space-y-4 mb-5" onSubmit={handleSubmit} id="search-pokemon">
                <fieldset>
                    <label htmlFor="search-poke">Search: </label>
                    <input type="text" id="search-poke" onChange={handleSearch} className="border rounded-md"/>
                </fieldset>

                <button className="bg-slate-700 text-white px-4 rounded-full w-fit mx-auto">Enviar</button>
            </form>

            <Link to="/pokemons/1" className="border w-fit py-2 px-5 rounded-md mx-auto">List</Link>
        </div>
    )
}
