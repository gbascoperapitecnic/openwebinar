import { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../context/movies.context";

export default function ErrorPage() {
  
  //comprobar si el usuario esta logueado, para redirigirlo a login o home
  const {hasAccess, setHasAccess} = useContext(MoviesContext)
  

  return (
    <div className="min-h-screen flex items-center flex-col gap-4 justify-center">
        <h1 className="text-3xl text-white">Error, parece que esta página no existe.</h1>
        <Link to={hasAccess ? "/page/1" : "/"} className="bg-white rounded px-5 py-2 text-black">Volver a {hasAccess ? "home" : "Login"}</Link>
    </div>
  )
}
