import { Link} from 'react-router-dom'
import Logo from '../assets/tmdb.svg'

export default function Navbar({handleSearch, setSearch, search, volverAHome, isMovie}) {
  return (
    <nav className='flex justify-between items-center flex-wrap mb-6'>
        <h2 className='text-left text-3xl font-semibold py-10 my-3 flex items-center gap-6'> 
            <Link to={"/movies/page/1"}>
                <img src={Logo} className='w-28'></img>
            </Link>
            {`Top Rated ${isMovie ? "Movies" : "TV Series"}`}
        </h2>
        <div className='flex gap-2 items-center flex-wrap'>
            <form className="space-x-3 flex" onSubmit={handleSearch}>
                <input 
                    type="search" 
                    id="search" 
                    placeholder="Search by name" 
                    name="name" 
                    className="p-2 rounded-md text-black w-full" 
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button type="submit" className="bg-[#01b3e49a] px-3 py-2 rounded disabled:opacity-35" disabled={!search}>Search</button>
            </form>
            <button className='bg-[#01b3e49a] px-3 py-2 rounded' onClick={volverAHome}>Volver</button>
            <Link className='bg-[#01b3e49a] px-3 py-2 rounded' to={"/"} onClick={() => setHasAccess(false)}>Salir</Link>
        </div>
    </nav>
  )
}