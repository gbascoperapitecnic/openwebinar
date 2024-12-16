import { useContext, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { ArrowLeftFromLine, ArrowRightFromLine, ArrowUp, LucideSearchX, MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { MoviesContext } from '../context/movies.context';
import Navbar from '../components/Navbar';

import useMovieSerie from '../hooks/useMovieSerie';

export default function TvPage() {
   
    const {page, search, setIsSearching, movieData,  setMovieData, serieData, navigate, setSerieData, error, isSearching, MIN_PAGE, maxPage, totalMovies, totalSeries, setSearch, err, fetchSearch, fetchTopRated, volverAHome, scrollToTop} = useMovieSerie()


    const {credentials} = useContext(MoviesContext)

    if (!credentials.hasAccess) {
      return <Navigate to={"/"}/>
    }
    
    const {options} = useContext(MoviesContext)

   
    useEffect(() => {
      if (!isSearching) {
        fetchTopRated("tv")
      }else{
        fetchSearch("tv")
      }
    }, [page])

    
    const goTo = (page) => {
      page > 0 && navigate(`/tv/page/${page}`)
    }
    
    const handleSearch = (e) => {
      e.preventDefault()

      setIsSearching(true)
      fetchSearch("tv")

      goTo(1)
    }
  

    return (
      <section className='text-white'>
        <Navbar 
          handleSearch={handleSearch}
          setSearch={setSearch}
          search={search} 
          volverAHome={volverAHome}
          isMovie={false}
        />

        {
          !totalSeries ? (
            <div className='flex justify-center flex-col items-center gap-2 h-[45rem]'>
              <LucideSearchX size={60}/>
              <p>No se ha podido encontrar ninguna serie con tu búsqueda</p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl mb-10 opacity-70">Found: <span className='font-bold'>{totalSeries}</span> TV Series</h1>
              <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5'>
                {
                  error ? (
                    <p>Error: {err}</p>
                  ) : (
                    serieData && (
                      serieData.map((serie) => 
                        <MovieCard
                          key={serie.id}
                          movie={serie}
                          isMovie={false}
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