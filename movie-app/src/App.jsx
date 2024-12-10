import { useEffect, useState } from 'react';
import './App.css'
import MovieCard from './components/MovieCard';

function App() {

  const [movieData, setMovieData] = useState([])
  const [error, setError] = useState("")

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjViZjE0YmE0OTEzMjliODcxYTg2ZWE1YzcyMzJmYyIsIm5iZiI6MTczMzc2Mjk5MS40Nywic3ViIjoiNjc1NzFmYWY2ZTBiZWQyNjZiN2ZiNmQyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.zdI3vhG-kXsBScl9BgVqCGp9c-d2Rq0PUMcZObbFQJk'
    }
  };
  
  // al cargar el componente, cargar las peliculas
  useEffect(()=> {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => setMovieData(res.results))
    .catch(err => setError(err));
  }, [])

  console.log(movieData)

  return (
    <section className=''>
      <h1>Movie App</h1>
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
    </section>
  )
}

export default App
