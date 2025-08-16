import { useState,useEffect } from 'react'
import axios from 'axios'

const Detailed = ({country,temp,wind,icon})=>{

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((m) =>
          <li key={m}>{m}</li>
        )}
      </ul>
      <img src={country.flags.png}></img>
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature {temp} Celsius</p>
      {icon!==null &&<img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img>}
      <p>Wind {wind} m/s</p>
    </div>
  )
}

const Country = ({name,setSearch})=>{
  return (
    <div>
    {name}
    <button onClick={()=>setSearch(name)}>Show</button>
    </div>
  )
}


const App = () => {
  const api_key = import.meta.env.VITE_WEATHER_KEY
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [temp, setTemp] = useState(null)
  const [wind, setWind] = useState(null)
  const [icon, setIcon] = useState(null)

  const handleSearchChange = (event) => setSearch(event.target.value)

  const filtered = data.filter((m)=>m.name.common.toLowerCase().includes(search.toLowerCase()))

  if(filtered.length === 1){
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${filtered[0].capital[0]}&appid=${api_key}`)
      .then(response=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${api_key}&units=metric`)
          .then(res=>{
            setTemp(res.data.main.temp)
            setWind(res.data.wind.speed)
            setIcon(res.data.weather[0].icon)
          })
      })
  }

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(response=>{
      setData(response.data)
      console.log(response.data)
    }
    )
  }, [])
  
  return (
    <>
      find countries <input value={search} onChange={handleSearchChange}></input>
      <div>
        {filtered.length>1 && filtered.length<=10 &&
        filtered.map((m)=>
        <Country key={m.name.common} name={m.name.common} setSearch={setSearch}></Country>)
        
        }
        {filtered.length > 10 && "Too many matches, specify another filter"}
        {filtered.length === 1 && <Detailed country={filtered[0]} temp={temp} wind={wind} icon={icon}></Detailed>}
      </div>
    </>
  )
}

export default App
