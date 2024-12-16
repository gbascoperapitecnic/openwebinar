import { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { ArrowLeftFromLine, ArrowRightFromLine, ArrowUp, LucideSearchX, MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { MoviesContext } from '../context/movies.context';
import Navbar from '../components/Navbar';
import useMovieSerie from '../hooks/useMovieSerie';

export default function MoviePage() {
   
    const {page, search, setIsSearching, movieData,  setMovieData, serieData, navigate, setSerieData, error, isSearching, MIN_PAGE, maxPage, totalMovies, totalSeries, setSearch, err, fetchSearch, fetchTopRated, volverAHome, scrollToTop} = useMovieSerie()

    const {credentials, options} = useContext(MoviesContext)

    if (!credentials.hasAccess) {
      return <Navigate to={"/"}/>
    }

    useEffect(() => {
      //comprobar si el usuario ha hecho submit en el search para llamar a una api o otra 
      if (!isSearching) {
        fetchTopRated("movie")
      }else{
        fetchSearch("movie")
      }
    }, [page])
    

    const goTo = (page) => {
      page > 0 && navigate(`/movies/page/${page}`)
    }

    const handleSearch = (e) => {
      e.preventDefault()

      setIsSearching(true)
      fetchSearch("movie")

      goTo(1)
    }


    return (
      <section className='text-white relative'>
        <Navbar 
          handleSearch={handleSearch}
          setSearch={setSearch}
          search={search} 
          volverAHome={volverAHome}
          isMovie={true}
        />
        {
          !totalMovies ? (
            <div className='flex justify-center flex-col items-center gap-2 h-[45rem]'>
              <LucideSearchX size={60}/>
              <p>No se ha podido encontrar ninguna película con tu búsqueda</p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl mb-10 opacity-70">Found: <span className='font-bold'>{totalMovies}</span> movies</h1>
              <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
                {
                  error ? (
                    <p>Error: {err}</p>
                  ) : (
                    movieData && (
                      movieData.map((movie) => 
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          isMovie={true}
                        />
                      ) 
                    )
                  )
                }
              </div>
          
              <div className='flex justify-center items-center p-7 gap-3 mt-5'>
                <button 
                  className='rounded-md bg-indigo-800 text-white p-2' 
                  onClick={()=> goTo(MIN_PAGE)}
                >
                  <ArrowLeftFromLine/>
                </button>
                <button 
                  className='rounded-md bg-indigo-800 text-white p-2 disabled:opacity-45'
                  onClick={()=> goTo(Number(page)-1)}
                  disabled={page == MIN_PAGE}
                >
                  <MoveLeftIcon/>
                </button>
                <p className='text-xl'>{page}</p>
                <button
                  className='rounded-md bg-indigo-800 text-white p-2 disabled:opacity-55' 
                  onClick={() => goTo(Number(page)+1)}
                  disabled={page == maxPage}
                >
                  <MoveRightIcon/>
                </button>
                <button 
                  className='rounded-md bg-indigo-800 text-white p-2' 
                  onClick={()=> goTo(maxPage)}
                >
                  <ArrowRightFromLine/>
                </button>
              </div>
            </>
          )
        }
        <button className='text-white fixed right-4 bottom-3 rounded-full p-1 bg-indigo-900' onClick={scrollToTop}>
          <ArrowUp size={35}/>
        </button>
      </section>
    )    
}