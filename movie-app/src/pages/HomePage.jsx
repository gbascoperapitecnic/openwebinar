import { Link} from 'react-router-dom'

export default function HomePage() {
   
  return (
    <section className="text-white h-screen flex items-center justify-center">
      <div className='p-4 flex flex-col w-[30rem]'>
        <h1 className='text-5xl'>Bienvenido!</h1>
        <p className='mb-4 text-lg'>Qué quieres buscar?</p>
        <div className='flex gap-4 justify-center text-lg'>
          <Link to={"/movies/page/1"} className='bg-indigo-800 rounded-md p-2'>Películas</Link>
          <Link to={"/tv/page/1"} className='bg-indigo-800 rounded-md p-2'>Series</Link>
        </div>
      </div>
    </section>
  )
}
