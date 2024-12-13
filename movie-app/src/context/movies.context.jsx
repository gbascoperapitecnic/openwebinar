import { createContext, useState } from "react";


const MoviesContext = createContext()

function MoviesProviderWrapper(props) {
    const [err, setErr] = useState("")

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjViZjE0YmE0OTEzMjliODcxYTg2ZWE1YzcyMzJmYyIsIm5iZiI6MTczMzc2Mjk5MS40Nywic3ViIjoiNjc1NzFmYWY2ZTBiZWQyNjZiN2ZiNmQyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.zdI3vhG-kXsBScl9BgVqCGp9c-d2Rq0PUMcZObbFQJk'
        }
    };

    const movieGenres = [
        {
        id: 28,
        "name": "Action"
        },
        {
        id: 12,
        name: "Adventure"
        },
        {
        id: 16,
        name: "Animation"
        },
        {
        id: 35,
        name: "Comedy"
        },
        {
        id: 80,
        name: "Crime"
        },
        {
        id: 99,
        name: "Documentary"
        },
        {
        id: 18,
        name: "Drama"
        },
        {
        id: 10751,
        name: "Family"
        },
        {
        id: 14,
        name: "Fantasy"
        },
        {
        id: 36,
        name: "History"
        },
        {
        id: 27,
        name: "Horror"
        },
        {
        id: 10402,
        name: "Music"
        },
        {
        id: 9648,
        name: "Mystery"
        },
        {
        id: 10749,
        name: "Romance"
        },
        {
        id: 878,
        name: "Science Fiction"
        },
        {
        id: 10770,
        name: "TV Movie"
        },
        {
        id: 53,
        name: "Thriller"
        },
        {
        id: 10752,
        name: "War"
        },
        {
        id: 37,
        name: "Western"
        }
    ]

    const tvGenres = [
        {
        "id": 10759,
        "name": "Action & Adventure"
        },
        {
        "id": 16,
        "name": "Animation"
        },
        {
        "id": 35,
        "name": "Comedy"
        },
        {
        "id": 80,
        "name": "Crime"
        },
        {
        "id": 99,
        "name": "Documentary"
        },
        {
        "id": 18,
        "name": "Drama"
        },
        {
        "id": 10751,
        "name": "Family"
        },
        {
        "id": 10762,
        "name": "Kids"
        },
        {
        "id": 9648,
        "name": "Mystery"
        },
        {
        "id": 10763,
        "name": "News"
        },
        {
        "id": 10764,
        "name": "Reality"
        },
        {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
        },
        {
        "id": 10766,
        "name": "Soap"
        },
        {
        "id": 10767,
        "name": "Talk"
        },
        {
        "id": 10768,
        "name": "War & Politics"
        },
        {
        "id": 37,
        "name": "Western"
        }
    ]

    const credentials = {
        hasAccess: true,
        username: "gab",
        password: 123
    }

    const fetchSearch = async (type) => {
        try {
            if (type === "movie" || type === "tv") {
                const response = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
                const data = await response.json()                
            }

            type === "movie" ? setMovieData(data.results) : setSerieData(data.results) //

            setMaxPage(data.total_pages)
            setTotalMovies(data.total_results)
            setError("")
    
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    const fetchTopRated = async (type) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?language=en-US&page=${page}`, options)
            const data = await response.json()

            type === "movie" ? setMovieData(data.results) : setSerieData(data.results) //nota: se podria manejar un solo estado y no 2?

            setMaxPage(data.total_pages)
            setTotalMovies(data.total_results)
            setError("")
        } catch (error) {
            setErr(error)
            console.log(error)
        }
    }

    const [hasAccess, setHasAccess] = useState(false)

    return (
        <MoviesContext.Provider value={{options, movieGenres, tvGenres, credentials, hasAccess, setHasAccess, fetchSearch, fetchTopRated}}>
            {props.children}
        </MoviesContext.Provider>
    )
}

export {MoviesContext, MoviesProviderWrapper}