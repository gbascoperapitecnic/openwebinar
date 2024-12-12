import { createContext, useState } from "react";


const MoviesContext = createContext()

function MoviesProviderWrapper(props) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjViZjE0YmE0OTEzMjliODcxYTg2ZWE1YzcyMzJmYyIsIm5iZiI6MTczMzc2Mjk5MS40Nywic3ViIjoiNjc1NzFmYWY2ZTBiZWQyNjZiN2ZiNmQyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.zdI3vhG-kXsBScl9BgVqCGp9c-d2Rq0PUMcZObbFQJk'
        }
    };

    const genres = [
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


    const credentials = {
        username: "gab",
        password: 123
    }

    const [hasAccess, setHasAccess] = useState(false)

    return (
        <MoviesContext.Provider value={{options, genres, credentials, hasAccess, setHasAccess}}>
            {props.children}
        </MoviesContext.Provider>
    )
}

export {MoviesContext, MoviesProviderWrapper}