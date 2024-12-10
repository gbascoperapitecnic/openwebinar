import { useEffect, useState } from "react"

export default function SearchPage() {
  
  const [search, setSearch] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()

    //peticion a la api
    
    // fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)
    // .then(res => res.json())
    // .then(res => console.log(res))
    // .catch(err => console.error(err));

    // console.log(movieData)
  }
  
  return (
    <section className="text-white p-4 border flex flex-col items-start">
        <form className="space-x-3" onSubmit={handleSearch}>
            <input type="text" id="search" placeholder="Search by name" name="name" className="p-2 rounded-md text-black" onChange={(e) => setSearch(e.target.value)}/>
            <button type="submit" className="bg-[#01b3e49a] px-3 py-2 rounded ">Search</button>
        </form>
    </section>  
  )
}
