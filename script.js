const searchInput = document.getElementById("search_input");
const currentLocationBtn = document.querySelector(".btn");

const currcityName = document.querySelector(".city-name");
const currTime = document.querySelector(".current-time");
const dayDate = document.querySelector(".day-date")
const currentTemp = document.querySelector(".current-temp");
const feelsLike = document.querySelector(".feels-like");
const mainWeatherIcon = document.querySelector("main-weather-icon") //main weather image icon on top

const mainWeather = document.getElementById("main")
const windspeedValue = document.getElementById("wind-speed");
const pressureValue = document.getElementById("pressure");
const humidityValue = document.getElementById("humidity-value");
const visibilityValue = document.getElementById("visibility")
const sunriseValue = document.getElementById("sunrise");
const sunsetValue = document.getElementById("sunset");


let typingTimer;
searchInput.addEventListener("input", (e) => {
  // let cityName = e.target.value;  //this is the cityname whichever user is entering we storing it in cityName and we are passing it as parameter to getweather function  and then receiving that value 
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    const cityName = e.target.value.trim();
    if (cityName) {
      getWeatherData(cityName);
    }
  }, 1000)

})

const api_key = "1cbe207627665a784928866b2665a1ca"
async function getWeatherData(cityName) {
  // --- Get city coordinates from user input  and extract lat and lon
  const geo_url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  const response = await fetch(geo_url);
  const data = await response.json();
  if (data.length === 0) {
    console.log("City not found!");
    return;
  }
  const latitude = data[0].lat;
  const longitude = data[0].lon;

  //--------------  Get current weather
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely&alerts&appid=${api_key}&units=metric`
  const response2 = await fetch(api_url);
  const weatherData = await response2.json();
  console.log(weatherData);

  const temperature = Math.floor(weatherData.main.temp);
  const feellikeTemp = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const pressure = weatherData.main.pressure;
  const windSpeed = weatherData.wind.speed;
  const currVisibility = weatherData.visibility / 1000;
  const city = weatherData.name;
  const currWeather = weatherData.weather[0].main;
  const sunRise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunSet = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


  //converting time from seconds to localtime
  const timezoneOffset = weatherData.timezone; // in seconds
  const utc = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (timezoneOffset * 1000));

  //time only 
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const formattedTime = localTime.toLocaleTimeString('en-US', timeOptions);

  //date only 
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = localTime.toLocaleDateString('en-US', dateOptions);

  const description = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;

  //Inserting the value in thier places
  currentTemp.innerHTML = `${temperature}°C`;
  feelsLike.innerHTML = `${feellikeTemp}°C`;
  humidityValue.innerHTML = `${humidity}%`;
  pressureValue.innerHTML = `${pressure}hPa`;
  windspeedValue.innerHTML = `${windSpeed}m/s`;
  visibilityValue.innerHTML = `${currVisibility}`
  currcityName.innerHTML = city;
  currTime.innerHTML = `${formattedTime}`
  dayDate.innerHTML = `${formattedDate}`
  mainWeather.innerHTML = `${currWeather}`
  sunriseValue.innerHTML = `${sunRise}AM`;
  sunsetValue.innerHTML = `${sunSet}pm`;


  //--- Get hourly + 5-day forecast
  const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`;
  const response3 = await fetch(forecast_url);
  const forecastData = await response3.json();
  console.log(forecastData);


}

