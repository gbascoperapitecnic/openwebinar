import Modal from '@mui/material/Modal';
import { CircleHelp, PlayCircle, Star, Video, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { MoviesContext } from '../context/movies.context';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import {cn} from '../lib/utils'

export default function ModalComponent({open, handleClose, movie, isMovie}) {
  const {movieGenres, tvGenres} = useContext(MoviesContext)

  const [genresMovie, setGenresMovie] = useState([])
  const [genresSerie, setGenresSerie] = useState([])

  const [trailer, setTrailer] = useState([])

  const [isWatchingTrailer, setIsWatchingTrailer] = useState(false)

  const {options} = useContext(MoviesContext)


  useEffect(() => {
    getGenresMovie(movie.genre_ids) 
    fetchVideoTrailer()
  }, [])

  const getGenresMovie = (genreIds)  => { 
    const genreTitles = genreIds.map((id) => {
      return isMovie ? movieGenres.find(obj => obj.id == id) : tvGenres.find(obj => obj.id == id)
    });

    isMovie ? setGenresMovie(genreTitles) : setGenresSerie(genreTitles)

  }

  //cargar trailers
  const fetchVideoTrailer  = async () => {

    try {
      const response = await fetch(`https://api.themoviedb.org/3/${isMovie ? "movie" : "tv"}/${movie.id}/videos?language=en-US`, options)
      const data = await response.json()   
      
      setTrailer(data.results.filter((video) => video.type === "Trailer"))
      

    } catch (error) {
      console.log(error)
    }
  }


  trailer.length && console.log(trailer)


  //vote_count


  return (
    <Modal
      onClose={handleClose}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='flex justify-center items-center'
      slots={{backdrop: Backdrop}}
      slotProps={{
        backdrop: {
          timeout: 900  ,
        }
      }}
    >
      <Fade in={open}>
        <div className={cn('shadow-2xl rounded-xl p-8 w-[60rem] relative text-white', !movie.backdrop_path && 'bg-black')}>
          <img className='absolute top-0 left-0 w-full h-full object-cover z-[-1] brightness-[20%] ' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt='imagen_fondo' />
          <div className='info-movie flex items-center justify-between'>
            <div className='flex flex-col'>
              {
                isMovie ? (
                  <>
                    <h1 className='text-5xl mb-3 font-semibold'>{movie.title}</h1>
                    <p>Título original: {movie.original_title}</p>
                    <p>Idioma original: {movie.original_language}</p>
                    <p>Fecha de estreno: {movie.release_date ? movie.release_date : "Not found"}</p>
                  </>
                ) : (
                  <>
                    <h1 className='text-5xl mb-3 font-semibold'>{movie.name}</h1>
                    <p>Título original: {movie.original_name}</p>
                    <p>Idioma original: {movie.original_language}</p>
                    <p>Fecha de estreno: {movie.first_air_date}</p>
                  </>
                )
              }
            </div>

            <div className='p-1'>
              <div className='flex flex-col gap-2 items-center'>
                <span>Puntuación: <span className='text-xl font-semibold'>{movie.vote_average}</span>/10 <Star className='w-full' fill='rgb(245, 197, 24)' color='rgb(245, 197, 24)'/> </span>
                <span className='w-fit'>{movie.vote_count >= 1000 ? `${movie.vote_count/1000} k` : movie.vote_count }</span>
              </div>
            </div>
          </div>

          <div className='my-5'>
            <div className='grid grid-cols-4 w-full gap-4 place-items-center'>
              <div className='col-span-1 w-full h-full shadow-2xl'>
                  {
                    !movie.poster_path ? (
                      <CircleHelp className='border w-full'/>
                    ) : (
                      <img className='object-cover w-full h-full' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='poster'/>
                    )
                  }
              </div>

              <div className='col-span-3 w-full h-full shadow-2xl relative'>
                  {
                    isWatchingTrailer ? (         
                      trailer.length && (
                        <iframe width="" className='w-full' height="315" src={`https://www.youtube.com/embed/${trailer[0].key}?si=rFugqHHhzFmhyqmY&autoplay=1`} title="YouTube video player" style={{border: "0"}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                      )
                    ): (
                      <>
                        {!movie.backdrop_path ? (
                            <CircleHelp className='border w-full'/>
                          ) : (
                            <img className='object-cover w-full h-full' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt='backdrop'/>
                        )}

                        {trailer.length && (
                          <div className='absolute left-3 bottom-3'>
                            <PlayCircle size={40} className='cursor-pointer' onClick={() => setIsWatchingTrailer(true)}/>
                          </div>
                        )}
                      </>  
                    )
                  }
              </div>
             
            </div>
          </div>

          <div className=' my-5'>
            <div className='flex items-center gap-3 my-5 text-white'>
              {
                isMovie ? (
                  genresMovie && (
                    genresMovie.map((genre) => 
                      <p key={genre.id} className='border rounded-full py-1 px-4 hover:opacity-25 transition-opacity cursor-pointer'>{genre.name}</p>
                    )
                  )
                ): (
                  genresSerie && (
                    genresSerie.map((genre) => 
                      <p key={genre.id} className='border rounded-full py-1 px-4 hover:opacity-25 transition-opacity cursor-pointer'>{genre.name}</p>
                    )
                  )
                )
              }
            </div>
            <p className='text-lg'>{movie.overview}</p>
          </div>

          <button className='absolute right-0 top-0 p-1 bg-red-900' onClick={()=> {handleClose(); setIsWatchingTrailer(false)}}>
            <X/>
          </button>
        </div>
      </Fade>
    </Modal>
)
}