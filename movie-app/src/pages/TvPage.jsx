import { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { ArrowLeftFromLine, ArrowRightFromLine, LucideSearchX, MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import Logo from '../assets/tmdb.svg'
import { MoviesContext } from '../context/movies.context';


export default function TvPage() {
   
    const {credentials} = useContext(MoviesContext)

    if (!credentials.hasAccess) {
      return <Navigate to={"/"}/>
    }
    
    //pagina actual, pasada por parametro
    const {page} = useParams() 

    const [serieData, setSerieData] = useState([])
    const [error, setError] = useState("")

    const [isSearching, setIsSearching] = useState(false)

    const MIN_PAGE = 1
    const [maxPage, setMaxPage] = useState(1)
    
    //se obtiene options del contexto
    const {options} = useContext(MoviesContext)

    const [totalSeries, setTotalseries] = useState(1)

    // al cargar el componente, cargar las peliculas
    useEffect(() => {
      //comprobar si el usuario ha hecho submit en el search para llamar a una api o otra 
      if (!isSearching) {
        fetchMovieTopRated()
      }else{
        fetchSearch()
      }
    }, [page])
    

    //navegación usando rutas paramétricas
    const navigate = useNavigate()
    const goTo = (page) => {
      page > 0 && navigate(`/tv/page/${page}`)
    }


    // Search by title
    const [search, setSearch] = useState("")
    const [err, setErr] = useState("")


    const handleSearch = (e) => {
      e.preventDefault()

      setIsSearching(true)
      fetchSearch()

      goTo(1)
    }
  
    const fetchSearch = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
        const data = await response.json()

        setSerieData(data.results)
        setMaxPage(data.total_pages)
        setTotalseries(data.total_results)
        setError("")
  
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
  
    const fetchMovieTopRated = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`, options)
        const data = await response.json()

        setSerieData(data.results)
        setMaxPage(data.total_pages)
        setTotalseries(data.total_results)
        setError("")
      } catch (error) {
        setErr(error)
        console.log(error)
      }
    }

    const volverAHome = () => {
        setIsSearching(false)
        navigate("/home")
    } 
 


    return (
      <section className='text-white'>
        <nav className='flex justify-between items-center flex-wrap'>
            <h2 className='text-left text-3xl font-semibold py-10 my-3 flex items-center gap-6'> 
              <Link to={"/tv/page/1"}>
                <img src={Logo} className='w-28'></img>
              </Link>
              Top Rated TV Series
            </h2>
           <div className='flex gap-2 items-center'>
              <form className="space-x-3 " onSubmit={handleSearch}>
                <input 
                  type="search" 
                  id="search" 
                  placeholder="Search by name" 
                  name="name" 
                  className="p-2 rounded-md text-black" 
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <button type="submit" className="bg-[#01b3e49a] px-3 py-2 rounded disabled:opacity-35" disabled={!search}>Search</button>
              </form>
              <button className='bg-[#01b3e49a] px-3 py-2 rounded' onClick={volverAHome}>Volver</button>
              <Link className='bg-[#01b3e49a] px-3 py-2 rounded' to={"/"} onClick={() => setHasAccess(false)}>Salir</Link>
           </div>
        </nav>

        {
          !totalSeries ? (
            <div className='flex justify-center flex-col items-center gap-2 h-[45rem]'>
              <LucideSearchX size={60}/>
              <p>No se ha podido encontrar ninguna serie con tu búsqueda</p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl mb-10 opacity-70">Found: <span className='font-bold'>{totalSeries}</span> movies</h1>
              <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5'>
                {
                  error ? (
                    <p>Error: {err}</p>
                  ) : (
                    serieData && (
                      serieData.map((serie) => 
                        <MovieCard
                          key={serie.id}
                          movie={serie}
                          isMovie={false}
                        />
                      ) 
                    )
                  )
                }
              </div>
          
              <div className='flex justify-center items-center p-7 gap-3 mt-5'>
                <button 
                  className='rounded-md bg-indigo-800 text-white p-2' 
                  onClick={()=> goTo(MIN_PAGE)}
                >
                  <ArrowLeftFromLine/>
                </button>
                <button 
                  className='rounded-md bg-indigo-800 text-white p-2 disabled:opacity-45'
                  onClick={()=> goTo(Number(page)-1)}
                  disabled={page == MIN_PAGE}
                >
                  <MoveLeftIcon/>
                </button>
                <p className='text-xl'>{page}</p>
                <button
                  className='rounded-md bg-indigo-800 text-white p-2 disabled:opacity-55' 
                  onClick={() => goTo(Number(page)+1)}
                  disabled={page == maxPage}
                >
                  <MoveRightIcon/>
                </button>
                <button 
                  className='rounded-md bg-indigo-800 text-white p-2' 
                  onClick={()=> goTo(maxPage)}
                >
                  <ArrowRightFromLine/>
                </button>
              </div>
            </>
          )
        }
      </section>
    )    
}
