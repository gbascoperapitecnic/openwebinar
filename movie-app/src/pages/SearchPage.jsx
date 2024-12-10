import { useContext, useEffect, useState } from "react"
import { MoviesContext } from "../context/movies.context"
import MovieCard from "../components/MovieCard"
import { Link } from "react-router-dom"

export default function SearchPage() {
  
  const [search, setSearch] = useState("")
  const {options} = useContext(MoviesContext)
  const [data, setData] = useState(null)
  const [error, setError] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()

    //peticion a la api
    fetchSearch()
    console.log(data)
  }

  const fetchSearch = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options)
        const data = await  response.json()

        setData(data.results)
        setError("")

    } catch (error) {
        setError(error)
        console.log(error)
    }
  }

  
  return (
    <section className="text-white py-10 px-2 flex flex-col items-start gap-20">
        <div className="w-full flex justify-between">
            <form className="space-x-3 " onSubmit={handleSearch}>
                <input type="text" id="search" placeholder="Search by name" name="name" className="p-2 rounded-md text-black" onChange={(e) => setSearch(e.target.value)}/>
                <button type="submit" className="bg-[#01b3e49a] px-3 py-2 rounded ">Search</button>
            </form>
            <Link to={"/page/1"} className='px-3 py-2 rounded bg-[#01b3e49a]'>Volver</Link>
        </div>
        {
            data && (
                <>
                    <h1 className="text-3xl font-semibold">Found: {data.length}</h1>
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5'>
                        {
                            data.map((movie) => 
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                />
                            )
                        }
                    </div>      
                </>
            ) 
        
        }

    </section>  
  )
}
