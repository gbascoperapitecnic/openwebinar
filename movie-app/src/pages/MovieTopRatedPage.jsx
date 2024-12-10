import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { ArrowLeftFromLine, ArrowRightFromLine, MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function MovieTopRatedPage() {
    //pagina actual, pasada por parametro
    const {page} = useParams() 

    const [movieData, setMovieData] = useState([])
    const [error, setError] = useState("")

    const MIN_PAGE = 1
    const MAX_PAGE = 490
    

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjViZjE0YmE0OTEzMjliODcxYTg2ZWE1YzcyMzJmYyIsIm5iZiI6MTczMzc2Mjk5MS40Nywic3ViIjoiNjc1NzFmYWY2ZTBiZWQyNjZiN2ZiNmQyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.zdI3vhG-kXsBScl9BgVqCGp9c-d2Rq0PUMcZObbFQJk'
      }
    };
    
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

    
    // console.log(movieData.results)
    
    return (
      <section className='text-white'>
        {/* <h1>Movie App</h1> */}
        <h2 className='text-left text-3xl font-semibold p-3 my-3'>Top Rated Movies</h2>
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
