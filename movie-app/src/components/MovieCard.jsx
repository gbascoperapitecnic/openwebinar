import { InfoIcon, Star } from 'lucide-react';

export default function MovieCard({movie}) {
  return (
    <div className="rounded-lg border overflow-hidden bg-[#1A1A1A] text-white">
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />

        <div className='p-3 space-y-3'>
            <p className='text-left'>{movie.title}</p>
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
  )
}
