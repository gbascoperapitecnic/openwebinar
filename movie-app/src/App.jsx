import {Route, Routes} from "react-router-dom"
import './App.css'
import ErrorPage from "./pages/ErrorPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"
import TvPage from "./pages/TvPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/home" element={<HomePage/>} />
      <Route path="/movies/page/:page" element={<MoviePage/>} />
      <Route path="/tv/page/:page" element={<TvPage/>} />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
  )
}

export default App
