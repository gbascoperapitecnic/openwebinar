import {Route, Routes} from "react-router-dom"
import './App.css'
import MovieTopRatedPage from "./pages/MovieTopRatedPage"
import ErrorPage from "./pages/ErrorPage"
import SearchPage from "./pages/SearchPage"
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/page/:page" element={<MovieTopRatedPage/>} />
      <Route path="/search" element={<SearchPage/>} />
      <Route path="/*" element={<ErrorPage/>} />
    </Routes>
  )
}

export default App
