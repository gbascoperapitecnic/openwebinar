import { useState } from 'react'
import './App.css'
import WeatherInfo from './components/WeatherInfo'

function App() {
  const [city, setCity] = useState("")
  const [data, setData] = useState(null)

  const [err, setErr] = useState("")
  
  const key = import.meta.env.VITE_API_KEY

  const handleChange = (e) =>{
    setCity(e.target.value)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    // hacer dos llamadas a la api, una para obtener la lat y lon de la ciudad y la otra para obtener los datos con la lat y lon
    try {
      const cityData = await fetchCityInfo()
      await fetchWeatherData(cityData[0].lat, cityData[0].lon)
      setErr("")

    } catch (error) {
      console.log(error)
      setErr('Error, Cant obtain weather data.')
    }
  }

  const fetchCityInfo = async () => {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
      const data = await response.json()
      return data

    } catch (error) {
      console.log(error)
    }

  } 

  const fetchWeatherData = async (lat, lon) => {
    //despues de obtener la geolocalizacion de la ciudad, obtener data de la misma
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
      const data = await response.json()

      setData(data)
      
    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <>
      <div style={{border: "1px solid black", padding: "2rem", borderRadius: ".5rem", width: "30rem"}}>
        <h1>Weather</h1>
        <form action="" onSubmit={handleSubmit}>
          <input type="search" placeholder='Search by City...' onChange={handleChange} value={city}/>
          <button style={{border: "1px solid black", margin: "0 1rem"}} type='submit'>Search</button>
        {
          data && !err ? (
            <WeatherInfo
              data={data}
            />
          ): (
            <p>{err}</p>
          ) 
        }
        </form>
      </div>
    </>
  )
}

export default App