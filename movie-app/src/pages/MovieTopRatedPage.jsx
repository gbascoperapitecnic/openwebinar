import { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { ArrowLeftFromLine, ArrowRightFromLine, MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom'

import Logo from '../assets/tmdb.svg'
import { MoviesContext } from '../context/movies.context';

export default function MovieTopRatedPage() {
    //pagina actual, pasada por parametro
    const {page} = useParams() 

    const [movieData, setMovieData] = useState([])
    const [error, setError] = useState("")

    const MIN_PAGE = 1
    const MAX_PAGE = 490
    
    //se obtiene options del contexto
    const {options} = useContext(MoviesContext)
    
    // al cargar el componente, cargar las peliculas
    useEffect(()=> {
      fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, options)
      .then(res => res.json())
      .then(res => {setMovieData(res.results)})
      .catch(err => setError(err));
    }, [page])
    
    //navegación usando rutas paramétricas
    const navigate = useNavigate()
    const goTo = (page) => {
        page > 0 && navigate(`/page/${page}`)
    }
    
    return (
      <section className='text-white'>
        <nav className='flex justify-between items-center'>
            <h2 className='text-left text-3xl font-semibold py-10 my-3 flex items-center gap-6'> 
                <img src={Logo} className='w-28'></img>
                Top Rated Movies
            </h2>
           <div>
                <Link to={"/search"} className='px-3 py-2 rounded bg-[#01b3e49a]'>Search</Link>

           </div>
        </nav>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5'>
          {
            error ? (
              <p>Error</p>
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
          <button className='rounded-md bg-white text-black p-2' onClick={()=> goTo(1)}>
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
            disabled={page == MAX_PAGE}
          >
            <MoveRightIcon/>
          </button>
          <button className='rounded-md bg-white text-black p-2' onClick={()=> goTo(490)}>
            <ArrowRightFromLine/>
          </button>
        </div>
      </section>
    )    
}
