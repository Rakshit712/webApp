import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaTemperatureHigh } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";


function App() {
  const [searchedValue, setsearchedValue] = useState("")
  const [data , setData] = useState({})
  const [error , setError] = useState("")
  

  const url  = `https://api.openweathermap.org/data/2.5/weather?q=${searchedValue}&appid=0fcc9fc23f465e62947162ac0fedd26c`;

    

  const handleSearch = (e)=>{
    e.preventDefault();

     fetch(url)
     .then((response) => response.json())
      .then((data) =>setData(data))
      .catch((err) => console.error('Error fetching data:', err));
      // console.log(data);

  }
  
  useEffect(()=>{
    console.log(data)
    if(data.cod){ 
       if (data.main){setError("")}
       else{setError("Please enter a valid city")}}
  },[data])

  const handleChange = (e)=>{
    setsearchedValue(e.target.value);
    
  }

  return (
    <>
    <div className='bodyy'>
    <div className="main">
      <div className='container' >
        <h2>Planning an outing? check weather here..</h2>
        {/* <label>Your city : </label> */}
        <input className='search' placeholder='Search'
         value={searchedValue}
          onChange={handleChange}
          ></input>
        <button type='submit' onClick={handleSearch}>Go</button>
      </div>

      <div className='weatherLoading'>
        {error && (<p style={{color : "whitesmoke"}}>{error}</p>)}
        
      {data.main && (
          <div className='weather-card' >
            {console.log(data)}
            <h2>{`Weather in ${data.name} is : `}</h2>
            
            <p><FaTemperatureHigh className='icons' />__Temperature: {`${-parseInt(273.15 - data.main.temp)}`} &deg; Celcius</p>
            <p> <TiWeatherCloudy className='icons'/>__Description: {data.weather[0].description}</p>
            <p> <WiHumidity className='icons' />__Humidity: {data.main.humidity }%</p>
            <p> <MdKeyboardDoubleArrowDown className='icons'/>__Pressure: {data.main.pressure } bars </p>
          </div>)}
      </div>
      </div>
      </div>
    </>
  )
}

export default App