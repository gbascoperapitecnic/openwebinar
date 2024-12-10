
export default function MovieCard({movie}) {
  return (
    <div className="border">
        <p>{movie.title}</p>
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
    </div>
  )
}
