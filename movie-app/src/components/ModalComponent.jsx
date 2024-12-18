import Modal from '@mui/material/Modal';
import { CircleHelp, PlayCircle, Star, Video, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { MoviesContext } from '../context/movies.context';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import {cn} from '../lib/utils'
import Providers from './Providers';

export default function ModalComponent({open, handleClose, movie, isMovie}) {
  const {movieGenres, tvGenres} = useContext(MoviesContext)

  const [genresMovie, setGenresMovie] = useState([])
  const [genresSerie, setGenresSerie] = useState([])

  const [trailer, setTrailer] = useState([])

  const [isWatchingTrailer, setIsWatchingTrailer] = useState(false)

  const {options} = useContext(MoviesContext)


  const [providers, setProviders] = useState(null)

  useEffect(() => {
    getGenresMovie(movie.genre_ids) 
    fetchVideoTrailer()
    fetchProviders()
  }, [])

  const getGenresMovie = (genreIds) => { 
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
      
      setTrailer(data.results.filter((video) => video.type === "Trailer" || (video.official === true && video.type !== "Featurette"))) //introducir video si es trailer o cualquier otro video oficial: clip, opening...
      

    } catch (error) {
      console.log(error)
    }
  }

  const fetchProviders = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/${isMovie ? "movie" : "tv"}/${movie.id}/watch/providers`, options)
      const data = await response.json()
  
      setProviders(data.results.ES)
        
    } catch (error) {
      console.log(error)
    }
  }


  const backgroundImageStyle = movie.backdrop_path ? `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')` : 'none'  
  const stylesBackground = {
    background: backgroundImageStyle,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed"
  }


  return (
    <Modal
      onClose={handleClose}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='flex justify-center items-end max-w-[60rem] mx-auto md:items-center'
      slots={{backdrop: Backdrop}}
      slotProps={{
        backdrop: {
          timeout: 900  ,
        }
      }}
    >
      <Fade in={open}>
        <div id='modalContainer' className={cn('shadow-2xl h-[40rem] p-6 overflow-auto rounded-xl w-[60rem] relative text-white m-3 md:h-[50rem] bg-fixed', !movie.backdrop_path && 'bg-black')} style={stylesBackground} >
          
          <div style={{
            content: '',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // capa de opacidad en la imagen de fondo
            zIndex: 1,
          }}>
          </div>

          <button className='absolute right-2 top-1  p-1 bg-red-900 rounded-full z-10' onClick={()=> {handleClose(); setIsWatchingTrailer(false)}}>
            <X/>
          </button>

          <div className='relative z-10 rounded-xl'>          
            <div className='info-movie flex items-center justify-between flex-wrap gap-2'>
              <div className='flex flex-col'>
                {
                  isMovie ? (
                    <>
                      <h1 className='text-5xl mb-3 font-semibold'>{movie.title}</h1>
                      <ul className='p-0 ml-4'>
                        <li>Título original: {movie.original_title}</li>
                        <li>Idioma original: {(movie.original_language).toUpperCase()}</li>
                        <li>Fecha de estreno: {movie.release_date ? movie.release_date : "Not found"}</li>
                        <li>Id: {movie.id}</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <h1 className='text-5xl mb-3 font-semibold'>{movie.name}</h1>
                      <ul className='p-0 ml-4'>
                        <li>Título original: {movie.original_name}</li>
                        <li>Idioma original: {movie.original_language}</li>
                        <li>Fecha de estreno: {movie.first_air_date ? movie.first_air_date : "Not found"}</li>
                        <li>Id: {movie.id}</li>
                      </ul>
                    </>
                  )
                }
              </div>

              <div className='p-1'>
                <div className='flex flex-col items-center'>
                  <div className='w-full '>
                    <span className=''>Puntuación: <span className='text-xl font-semibold'>{movie.vote_average}</span>/10 <Star className='w-full' fill='rgb(245, 197, 24)' color='rgb(245, 197, 24)'/></span>
                  </div>
                  <span className='w-fit'>{movie.vote_count >= 1000 ? `${movie.vote_count/1000} k` : movie.vote_count }</span>
                </div>
              </div>
            </div>

            <div className='my-5'>
              <div className='grid grid-cols-4 w-full gap-4 place-items-center'>
                <div className='col-span-1 hidden w-full h-full shadow-2xl md:block'>
                    {
                      !movie.poster_path ? (
                        <CircleHelp className='border w-full'/>
                      ) : (
                        <img className='object-cover w-full h-full' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='poster'/>
                      )
                    }
                </div>

                <div className='col-span-4 w-full h-full shadow-2xl relative sm:col-span-3'>
                    {
                      isWatchingTrailer ? (         
                        trailer.length && (
                          <iframe width="" className='w-full' height="315" src={`https://www.youtube.com/embed/${trailer[0].key}?si=rFugqHHhzFmhyqmY&autoplay=1`} title="YouTube video player" style={{border: "0"}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        )
                      ): (
                        <>
                          {!movie.backdrop_path ? (
                              <CircleHelp className='border w-full'/>
                            ) : (
                              <img className='object-cover w-full h-full' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt='backdrop'/>
                          )}

                          {trailer.length &&  (
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
              <div className='flex items-center gap-3 my-5 text-white flex-wrap'>
                {
                  isMovie ? (
                    genresMovie?.map((genre) => 
                      <p key={genre?.id} className='border rounded-full py-1 px-4 hover:opacity-25 transition-opacity cursor-pointer'>{genre?.name}</p>
                    )
                    
                  ): (
                    genresSerie?.map((genre) => 
                      <p key={genre?.id} className='border rounded-full py-1 px-4 hover:opacity-25 transition-opacity cursor-pointer'>{genre?.name}</p>
                    )
                  )
                }
              </div>
              <p className='text-lg'>{movie.overview}</p>
              
              <div className='py-5'>
                <h3 className='semibold text-2xl'>Dónde ver: </h3>
                {
                  providers ? (
                    <Providers
                      providers={providers}
                    />
                  )  : (
                    <div className='flex items-center gap-2 py-2'>
                      <CircleHelp size={35} className=' mt-2'/>
                      <span>Actualmente no hay opciones disponibles para streaming.</span>
                    </div>
                  )
                }
                
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
)
}