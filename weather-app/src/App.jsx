import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState()
  const [data, setData] = useState(null)
  const [lon, setLon] = useState(null)
  const [lat, setLat] = useState(null)
  


  const handleChange = (e) =>{
    setCity(e.target.value)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    // hacer dos llamadas a la api, una para obtener la lat y lon de la ciudad y la otra para obtener los datos con la lat y lon
    await fetchCityInfo()
    await fetchWeatherData()
  }

  const fetchCityInfo = async () => {
    // obtener geolocalizacion de la ciudad
    try {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setLon(data[0].lat)
          setLat(data[0].lon)
        })
    } catch (error) {
      console.log(error);
    }
  } 



  const fetchWeatherData = async () => {
    // queremos llamar a esta funcion cuando el usuario haga un submit del formulario
    try {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
        .then((response) => response.json())
        .then((data)=> {
          console.log(data)
          setData(data)
        })
    } catch (error) {
      console.log(error)
    }
  } 
  // console.log(city)
  
  // console.log(lon)
  // console.log(lat)

  return (
    <>
      <h1>Weather</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="search" placeholder='Search by City...' onChange={handleChange} value={city}/>
        <button style={{border: "1px solid black", margin: "0 1rem"}} type='submit'>Search</button>
      {
        data > 0 && (
          <>
            <p>{data.weather[0].description}</p>
            <p>Temperature: {data.main.temp}</p>
          </>
        )
      }
      </form>
    </>
  )
}

export default App
