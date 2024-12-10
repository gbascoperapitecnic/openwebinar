import { createContext } from "react";

const MoviesContext = createContext()

function MoviesProviderWrapper(props) {
  
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjViZjE0YmE0OTEzMjliODcxYTg2ZWE1YzcyMzJmYyIsIm5iZiI6MTczMzc2Mjk5MS40Nywic3ViIjoiNjc1NzFmYWY2ZTBiZWQyNjZiN2ZiNmQyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.zdI3vhG-kXsBScl9BgVqCGp9c-d2Rq0PUMcZObbFQJk'
        }
    };

    return (
        <MoviesContext.Provider value={{options}}>
            {props.children}
        </MoviesContext.Provider>
    )
}

export {MoviesContext, MoviesProviderWrapper}