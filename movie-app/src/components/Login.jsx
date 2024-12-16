import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { MoviesContext } from "../context/movies.context";
import LogoShort from "../assets/tmdb-short.svg"
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {

  //estado para cambiar input a type text o type password
  const [showPassword, setShowPassword] = useState(true)

  const handleShowPassword = ()  => {
    setShowPassword(!showPassword)
  }

  const {credentials} = useContext(MoviesContext)

  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")


  const {hasAccess, setHasAccess} = useContext(MoviesContext)

  const navigate = useNavigate()

  const notifyError = () => toast.error("Contraseña o Usuario incorrectos", {
    position: "top-right",
    className: "bg-dark",
    autoClose: 2000,
    theme: "colored"
  });

  const handleSubmit = (e) => {
    e.preventDefault()

    if (credentials.username === username && credentials.password == Number(pass)) {
      navigate('/home')
      setHasAccess(true)

    }else{
      clearInputs()
      notifyError()
    }
  }

  const clearInputs = () => {
    setUsername("")
    setPass("")
  }

  return (
    <form className="mx-auto flex flex-col shadow-2xl rounded-xl px-6 py-9 max-w-[30rem] bg-[#0b101d] w-full" onSubmit={handleSubmit}>
      <div className="w-full flex justify-center pb-5">
        <a href="https://www.themoviedb.org/?language=es" target="_blank">
          <img src={LogoShort} alt="" className="w-28"/>
        </a>
      </div>
      <div className="mb-5 ">
        <label htmlFor="username" className="block mb-2 text-sm font-mediu text-start">Your username: </label>
        <input 
          type="text" 
          id="usename" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          className="bg-[#1E293B] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required 
        />
      </div>
      <div className="mb-5 relative">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-start">Your password: </label>
        <input 
          type={showPassword ? "password" : "text"}
          id="password" 
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="bg-[#1E293B] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required 
        />
        {  
          !showPassword ? (
            <Eye className="absolute right-2 bottom-2 cursor-pointer" onClick={handleShowPassword}/>
          ) :(
            <EyeOff className="absolute right-2 bottom-2 cursor-pointer" onClick={handleShowPassword}/>
          )
        }
      </div>
      <button 
        type="submit" 
        className="text-white bg-indigo-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg transition-opacity disabled:opacity-30 text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={!username || !pass}
      >
        Submit
      </button>
      <ToastContainer/>
    </form>
  )
}