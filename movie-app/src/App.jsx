import {Route, Routes} from "react-router-dom"
import './App.css'
import Login from "./components/Login"
import MovieTopRatedPage from "./pages/MovieTopRatedPage"
import ErrorPage from "./pages/ErrorPage"
import SearchPage from "./pages/SearchPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/page/:page" element={<MovieTopRatedPage/>} />
      <Route path="/search" element={<SearchPage/>} />
      <Route path="/*" element={<ErrorPage/>} />
    </Routes>
  )
}

export default App
