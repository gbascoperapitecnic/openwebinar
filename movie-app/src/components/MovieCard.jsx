import { InfoIcon, Star } from 'lucide-react';
import { useState } from 'react';
import ModalComponent from './ModalComponent';

export default function MovieCard({movie, isMovie}) {

  const releasedDate = isMovie ? new Date(movie.release_date) : new Date(movie.first_air_date) 

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
        <div className="rounded-lg shadow-2xl overflow-hidden bg-[#0b101d] hover:opacity-40 transition ease-in-out">
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />

            <div className='p-3 space-y-3'>
                {
                    isMovie ? (
                        <p className='text-left text-lg font-semibold'> {movie.title} {movie.release_date && `(${releasedDate.getFullYear()})`}</p>
                    ) : (
                        <p className='text-left text-lg font-semibold'>{movie.name} {movie.first_air_date && `(${releasedDate.getFullYear()})`}</p>
                    )
                }
                
                <div className='flex justify-between'>
                    <span className='flex gap-2 font-semibold'>
                        <Star fill='#f5c518' color='#f5c518'/>
                        {(Math.round(movie.vote_average * 100) / 100).toFixed(2)}
                    </span>
                    <button onClick={handleOpen}>
                        <InfoIcon/>
                    </button>

                </div>
            </div>

        </div>
        <ModalComponent
            open={open}
            handleClose={handleClose}
            movie={movie}
            isMovie={isMovie}
        />
    </>
  )
}