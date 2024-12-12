import { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { ArrowLeftFromLine, ArrowRightFromLine, MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import Logo from '../assets/tmdb.svg'
import { MoviesContext } from '../context/movies.context';

export default function MovieTopRatedPage() {
    //pagina actual, pasada por parametro
    const {page} = useParams() 

    const [movieData, setMovieData] = useState([])
    const [error, setError] = useState("")

    const [isSearching, setIsSearching] = useState(false)

    const MIN_PAGE = 1
    const [maxPage, setMaxPage] = useState(1)
    
    //se obtiene options del contexto
    const {options} = useContext(MoviesContext)

    const [totalMovies, setTotalMovies] = useState(1)

    // al cargar el componente, cargar las peliculas
    useEffect(() => {
      //comprobar si el usuario ha hecho submit en el search para llamar a una api o otra 
      if (!isSearching) {
        fetchMovieTopRated()
      }else{
        fetchSearch()
      }
    }, [page])
    
    console.log(movieData)

    //navegación usando rutas paramétricas
    const navigate = useNavigate()
    const goTo = (page) => {
      page > 0 && navigate(`/page/${page}`)
    }

    //si el usuario no tiene acceso, redirigirlo a login
    const {hasAcces} = useContext(MoviesContext)
    useEffect(() => {
      if (!hasAcces) {
        <Navigate to={"/"}/>
      }

    }, [hasAcces])


    // Search by title
    const [search, setSearch] = useState("")
    const [data, setData] = useState(null)
    const [err, setErr] = useState("")


    const handleSearch = (e) => {
      e.preventDefault()

      setIsSearching(true)
      fetchSearch()

      //redirigir a la pagina1 cuando el usuario busca una pelicula
      goTo(1)
    }
  
    const fetchSearch = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
        const data = await response.json()

        setMovieData(data.results)
        setMaxPage(data.total_pages)
        setTotalMovies(data.total_results)
        setError("")
  
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
  
    const fetchMovieTopRated = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, options)
        const data = await response.json()

        setMovieData(data.results)
        setMaxPage(data.total_pages)
        setTotalMovies(data.total_results)
        setError("")
      } catch (error) {
        setErr(error)
        console.log(error)
      }
    }

    const volverAHome = () => {
      setIsSearching(false)
      fetchMovieTopRated()
      goTo(1)
      setSearch("")
    } 


    return (
      <section className='text-white'>
        <nav className='flex justify-between items-center flex-wrap'>
            <h2 className='text-left text-3xl font-semibold py-10 my-3 flex items-center gap-6'> 
              <Link to={"/page/1"}>
                <img src={Logo} className='w-28'></img>
              </Link>
              Top Rated Movies
            </h2>
           <div className='flex gap-2 items-center'>
              <form className="space-x-3 " onSubmit={handleSearch}>
                <input 
                  type="text" 
                  id="search" 
                  placeholder="Search by name" 
                  name="name" 
                  className="p-2 rounded-md text-black" 
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <button type="submit" className="bg-[#01b3e49a] px-3 py-2 rounded ">Search</button>
              </form>
              <button className='bg-[#01b3e49a] px-3 py-2 rounded' onClick={volverAHome}>Volver</button>
           </div>
        </nav>
        <h1 className="text-3xl mb-10 opacity-70">Found: <span className='font-bold'>{totalMovies}</span> movies</h1>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5'>
          {
            error ? (
              <p>Error: {err}</p>
            ) : (
              movieData && (
                movieData.map((movie) => 
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                  />
                ) 
              )
    
            )
          }
        </div>
    
        <div className='flex justify-center items-center p-7 gap-3'>
          <button className='rounded-md bg-white text-black p-2' onClick={()=> goTo(MIN_PAGE)}>
            <ArrowLeftFromLine/>
          </button>
          <button 
            className='rounded-md bg-white text-black p-2 disabled:opacity-55'
            onClick={()=> goTo(Number(page)-1)}
            disabled={page == MIN_PAGE}
          >
            <MoveLeftIcon/>
          </button>
          <p className='text-xl'>{page}</p>
          <button
            className='rounded-md bg-white text-black p-2 disabled:opacity-55' 
            onClick={() => goTo(Number(page)+1)}
            disabled={page == maxPage}
          >
            <MoveRightIcon/>
          </button>
          <button className='rounded-md bg-white text-black p-2' onClick={()=> goTo(maxPage)}>
            <ArrowRightFromLine/>
          </button>
        </div>
      </section>
    )    
}
