import React, { useState } from "react";
import { useEffect } from "react";
import './App.css'

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  
  const API_KEY = "bcda10ba323e88e96cb486015a104d1d";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
    };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgAF0oVl-BUl_-mOji7V1EvtdEDmDiditwJA8UG1ktE-b6d7whLbBns3PamCPh79T3_-6QMLKf-EpA2nBQJGjgSxr68F_Psnhp6-tKDsF5CuY6mp3UBVCSkl772BCArqeOWK0PiyaciRiqF3xWMYV0pACjh17Yr5Nc1TjpPdspW_9IM5PaHxaVTrECnR9I/s279/thunder.png"; 
      case "Rain":
        return "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVUNlnLPTPyeQBBTHTY7nBxlRgltMyfiBbgeZmVCCtmBzUg8rkHi_-chBFvvaGp7bALUWaI9dDLtkjBqtg-7bpUi3UMGcMpLhj47RuZCRzKn-yEoClV_4LyIEF2TT_jzvuEeHQ0ZQ9crYj3IN4w_tSc64g0nY8s3bUDN-hPAGQdPIimPeLS7FmMb77FeM/s160/rain_with_cloud.png"; 
      case "Mist":
        return "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBt8IfXcCCEpLXS_c_nFbb4PjibvrOZwWOml7uLHZS7-xIvRhG0Wgn00OGYJwVk42bMlaTdZiBw6-CXgJwXzWw-2TJOLAMEb3bo36MGixXL3H4MN-6vQ59LDvR5DgIToVel9qRK5KNQpPFaTUnK2sqTWVyUbknuJ6eXxItDyE-p2kBf_-Ds1Feeylg8oU/s160/Tornado.png";
      case "Haze":  
        return "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpu91mcuhE3BLOuUQh2JQ6s6rjkUbiU02nW8Xk9LyjtcGkaB2sqNPGPzRfS-ciPZkixdbvP2pOpt7G-Y4W9ApDSKYrpzdYRvqEtNJVrgVma-3VgXIKMG3BkvWC1Y_MwNBrgLuRXymP6uy48qNJIumRiXfYRFcFIMP4PypU5L9CtBI5gA4ZzvvJ9cpmFMo/s316/sun.png"; 
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        {weatherData && (
          <>            
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              {/* <img className="container_img" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgAF0oVl-BUl_-mOji7V1EvtdEDmDiditwJA8UG1ktE-b6d7whLbBns3PamCPh79T3_-6QMLKf-EpA2nBQJGjgSxr68F_Psnhp6-tKDsF5CuY6mp3UBVCSkl772BCArqeOWK0PiyaciRiqF3xWMYV0pACjh17Yr5Nc1TjpPdspW_9IM5PaHxaVTrECnR9I/s279/thunder.png" width="180px" alt="sss"/> */}
              <img
                className="container_img"
                src={getWeatherIconUrl(weatherData.weather[0].main)}
                width="180px"
                alt="Weather Icon"
              />
              <h2 className="container_degree">{weatherData.main.temp}</h2>
              <h2 className="country_per">  {weatherData.weather[0].main} </h2>

              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  class="input"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Search</button>
              </form>
            </div>
          </>
        )}
      </div>

    </div>
  );
}

export default App;