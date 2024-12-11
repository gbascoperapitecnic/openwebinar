import { InfoIcon, Star } from 'lucide-react';
import { useState } from 'react';
import ModalComponent from './ModalComponent';

export default function MovieCard({movie}) {

  const releasedDate = new Date(movie.release_date)  
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
        <div className="rounded-lg shadow-2xl overflow-hidden bg-[#1A1A1A] hover:opacity-40 transition ease-in-out cursor-pointer" onClick={handleOpen}>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />

            <div className='p-3 space-y-3'>
                <p className='text-left text-lg font-semibold'>{movie.title} ({releasedDate.getFullYear()})</p>
                <div className='flex justify-between'>
                    <span className='flex gap-2 font-semibold'>
                        <Star fill='#f5c518' color='#f5c518'/>
                        {movie.vote_average}
                    </span>
                    <button>
                        <InfoIcon/>
                    </button>

                </div>
            </div>

        </div>
        <ModalComponent
            open={open}
            handleClose={handleClose}
            movie={movie}
        />
    </>
  )
}
