import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [searchedValue, setsearchedValue] = useState("")
  const [data , setData] = useState("")
  const [error , setError]=useState("")
  

  const url  = `https://api.openweathermap.org/data/2.5/weather?q=${searchedValue}&appid=0fcc9fc23f465e62947162ac0fedd26c`;

    

  const handleSearch = (e)=>{
    e.preventDefault();

    if(!searchedValue){
      setError("Please enter a city");
      return;
    }
    
    
     fetch(url)
     .then((response) => response.json())
      .then((data) =>setData(data))
      .catch((error) => console.error('Error fetching data:', error));
      // console.log(data);

  }

  const handleChange = (e)=>{
    setsearchedValue(e.target.value);
    
  }

  return (
    <>
    <div className='bodyy'>
    <div className="main">
      <div className='container' >
        <h2>Planning an outing check weather here..</h2>
        {/* <label>Your city : </label> */}
        <input className='search' placeholder='Search'
         value={searchedValue}
          onChange={handleChange}
          ></input>
        <button type='submit' onClick={handleSearch}>Go</button>
      </div>

      <div className='weatherLoading'>
        {/* {error && <p>{error}</p>} */}
        
      {data && (
          <div className='weather-card' >
            {console.log(data)}
            <h2>{`Weather in ${data.name} is : `}</h2>
            <p>Temperature: {`${-parseInt(273.15 - data.main.temp)}`} &deg; Celcius</p>
            <p>Description: {data.weather[0].description}</p>
            <p>Humidity: {data.main.humidity }%</p>
            <p>Pressure: {data.main.pressure } bars </p>
          </div>)}
      </div>
      </div>
      </div>
    </>
  )
}

export default App
