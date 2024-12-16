import {useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { MoviesContext } from '../context/movies.context';

export default function useMovieSerie() {
     
    const {credentials, options} = useContext(MoviesContext)

    //pagina actual, pasada por parametro
    const {page} = useParams() 

    const [movieData, setMovieData] = useState([])
    const [serieData, setSerieData] = useState([])

    const [error, setError] = useState("")

    const [isSearching, setIsSearching] = useState(false)

    const MIN_PAGE = 1
    const [maxPage, setMaxPage] = useState(1)
    

    const [totalMovies, setTotalMovies] = useState(1)
    const [totalSeries, setTotalseries] = useState(1)

    //navegación usando rutas paramétricas
    const navigate = useNavigate()


    // Search by title
    const [search, setSearch] = useState("")
    const [err, setErr] = useState("")


    const fetchSearch = async (type) => {
        try {
            if (type === "movie" || type === "tv") {
                const response = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
                const data = await response.json()                
          
                type === "movie" ? setMovieData(data.results) : setSerieData(data.results) 
                type === "movie" ? setTotalMovies(data.total_results) : setTotalseries(data.total_results) 
    
                
    
                setMaxPage(data.total_pages)
                setError("")
            }else{
                throw "Tipo Incorrecto"
            }

        } catch (error) {
            setError(error)
            console.log(error)
        }
    }
    

    const fetchTopRated = async (type) => {
        try {

            if (type === "movie" || type === "tv") {
                const response = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?language=en-US&page=${page}`, options)
                const data = await response.json()                
                
                type === "movie" ? setMovieData(data.results) : setSerieData(data.results) //nota: se podria manejar un solo estado y no 2?
                type === "movie" ? setTotalMovies(data.total_results) : setTotalseries(data.total_results) 
    
                setMaxPage(data.total_pages)
                setError("")
            }else{
                throw "Tipo Incorrecto"
            }
            
        } catch (error) {
            setErr(error)
            console.log(error)
        }
    }



    const volverAHome = () => {
        setIsSearching(false)
        navigate("/home")
    } 

    const scrollToTop = () => {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  

  
  
    return {
        page,
        search,
        setIsSearching,
        movieData, 
        setMovieData,
        navigate,
        serieData, 
        setSerieData,
        error,
        isSearching,
        MIN_PAGE,
        maxPage,
        totalMovies,
        totalSeries,
        setSearch,
        err,
        fetchSearch,
        fetchTopRated,
        volverAHome,
        scrollToTop

    }
}
