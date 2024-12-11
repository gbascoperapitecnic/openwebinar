import Modal from '@mui/material/Modal';
import { Star, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { MoviesContext } from '../context/movies.context';
import {cn} from '../lib/utils'

export default function ModalComponent({open, handleClose, movie}) {
  const {genres} = useContext(MoviesContext)

  const [genresMovie, setGenresMovie] = useState([])

  useEffect(() => {
    getGenresMovie(movie.genre_ids)
  }, [])

  const getGenresMovie = (genreIds)  => { 
    //obtener objetos de los ids pasados
    const genreTitles = genreIds.map((id) => {
      return genres.find(obj => obj.id == id)
    });

    setGenresMovie(genreTitles)
  }

  return (
    <Modal
      onClose={handleClose}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='flex justify-center items-center'
    >
     <div className='shadow-2xl rounded-xl p-8 w-[60rem] relative text-white'>
      <img className='absolute top-0 left-0 w-full h-full object-cover z-[-1] brightness-[20%] ' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
      <div className='info-movie flex items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-5xl py-2'>{movie.title}</h1>
          <p>Título original: {movie.original_title}</p>
          <p>Idioma original: {movie.original_language}</p>
          <p>Fecha de estreno: {movie.release_date}</p>
        </div>

        <div className='p-1'>
          <div className='flex flex-col gap-2 items-center'>
            <span>Puntuación: <span className='text-xl font-semibold'>{movie.vote_average}</span>/10 <Star className='w-full' fill='rgb(245, 197, 24)' color='rgb(245, 197, 24)'/> </span>
            <span className='w-fit'>{movie.vote_count}</span>
          </div>
        </div>
      </div>

      <div className='my-5'>
        <div className='grid grid-cols-4 w-full gap-4'>
          <img className='col-span-1 object-cover w-full h-full' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
          <img className='col-span-3 object-cover w-full h-full' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
        </div>
      </div>

      <div className=' my-5'>
        <div className='flex items-center gap-3 my-5 text-white'>
          {
            genresMovie && (
              genresMovie.map((genre) => 
                <p key={genre.id} className='border rounded-full py-1 px-4 hover:opacity-25 transition-opacity cursor-pointer'>{genre.name}</p>
              )
            )
          }
        </div>
        <p>{movie.overview}</p>
      </div>

      <button className='absolute right-0 top-0 p-2' onClick={handleClose}>
        <X/>
      </button>
     </div>
    </Modal>
)
}
