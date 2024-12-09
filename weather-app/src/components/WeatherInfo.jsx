import {Wind} from 'lucide-react'

export default function WeatherInfo({data}) {
  return (
    <>
      <h1>{data.name}</h1>
      <p>Country: <span style={{fontWeight: "bold"}}>{data.sys.country}</span></p>
      <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="" width={"90px"}/>
      <p>{data.weather[0].description}</p>
      <p>Temperature: {data.main.temp}°C</p>
      <p style={{display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem"}}>
        <Wind/>
        <span>{data.wind.speed} km/h</span>
      </p>
    </>
  )
}