import { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { ArrowLeftFromLine, ArrowRightFromLine, LucideSearchX, MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { MoviesContext } from '../context/movies.context';
import Navbar from '../components/Navbar';


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
        <Navbar 
          handleSearch={handleSearch}
          setSearch={setSearch}
          search={search} 
          volverAHome={volverAHome}
          isMovie={false}
        />

        {
          !totalSeries ? (
            <div className='flex justify-center flex-col items-center gap-2 h-[45rem]'>
              <LucideSearchX size={60}/>
              <p>No se ha podido encontrar ninguna serie con tu búsqueda</p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl mb-10 opacity-70">Found: <span className='font-bold'>{totalSeries}</span> TV Series</h1>
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