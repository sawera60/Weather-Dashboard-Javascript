// const searchInput = document.getElementById("search_input");
// const currentLocationBtn = document.querySelector(".btn");

// const currcityName = document.querySelector(".city-name");
// const currTime = document.querySelector(".current-time");
// const dayDate = document.querySelector(".day-date")
// const currentTemp = document.querySelector(".current-temp");
// const feelsLike = document.querySelector(".feels-like");
// const mainWeatherIcon = document.querySelector(".main-weather-icon") //main weather image icon on top
// const mainWeather = document.getElementById("main")
// const windspeedValue = document.getElementById("wind-speed");
// const pressureValue = document.getElementById("pressure");
// const humidityValue = document.getElementById("humidity-value");
// const visibilityValue = document.getElementById("visibility")
// const sunriseValue = document.getElementById("sunrise");
// const sunsetValue = document.getElementById("sunset");

// const weatherIcons = {
//   Clear: "images/sun.png",
//   Clouds: "images/cloudy.png",
//   Rain: "images/heavy-rain.png",
//   Thunderstorm: "images/storm.png",
//   Haze: "images/haze.png"

// }


// //Selecting hourly Cards
// const hourCards = document.querySelectorAll(".hour-all")
// //Selecting day Cards
// const dayCards = document.querySelectorAll(".day-all")



// //SetTimeout with Debounce 
// let typingTimer;
// searchInput.addEventListener("input", (e) => {
//   // let cityName = e.target.value;  //this is the cityname whichever user is entering we storing it in cityName and we are passing it as parameter to getweather function  and then receiving that value 
//   clearTimeout(typingTimer);
//   typingTimer = setTimeout(() => {
//     const cityName = e.target.value.trim();
//     if (cityName) {
//       getWeatherData(cityName);
//     }
//   }, 1000)

// })

// const api_key = "1cbe207627665a784928866b2665a1ca"
// async function getWeatherData(cityName) {
//   // --- Get city coordinates from user input  and extract lat and lon
//   const geo_url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
//   const response = await fetch(geo_url);
//   const data = await response.json();
//   if (data.length === 0) {
//     console.log("City not found!");
//     return;
//   }
//   const latitude = data[0].lat;
//   const longitude = data[0].lon;

//   //--------------  Get current weatherData
//   const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely&alerts&appid=${api_key}&units=metric`
//   const response2 = await fetch(api_url);
//   const weatherData = await response2.json();

//   //Extracting current weather value data from api
//   const temperature = Math.floor(weatherData.main.temp);
//   const feellikeTemp = weatherData.main.feels_like;
//   const humidity = weatherData.main.humidity;
//   const pressure = weatherData.main.pressure;
//   const windSpeed = weatherData.wind.speed;
//   const currVisibility = weatherData.visibility / 1000;
//   const city = weatherData.name;
//   const currWeather = weatherData.weather[0].main;
//   const sunRise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   const sunSet = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   //----converting time from seconds to localtime
//   const timezoneOffset = weatherData.timezone; // in seconds
//   const utc = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
//   const localTime = new Date(utc + (timezoneOffset * 1000));

//   //time only 
//   const timeOptions = { hour: '2-digit', minute: '2-digit' };
//   const formattedTime = localTime.toLocaleTimeString('en-US', timeOptions);

//   //date only 
//   const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
//   const formattedDate = localTime.toLocaleDateString('en-US', dateOptions);
//   const icon = weatherData.weather[0].icon;

//   //Updating the value in DOM that we got from API
//   currentTemp.innerHTML = `${temperature}°C`;
//   feelsLike.innerHTML = `${feellikeTemp}°C`;
//   humidityValue.innerHTML = `${humidity}%`;
//   pressureValue.innerHTML = `${pressure}hPa`;
//   windspeedValue.innerHTML = `${windSpeed}m/s`;
//   visibilityValue.innerHTML = `${currVisibility}`
//   currcityName.innerHTML = city;
//   currTime.innerHTML = `${formattedTime}`;
//   dayDate.innerHTML = `${formattedDate}`;
//   mainWeather.innerHTML = `${currWeather}`;
//   // Update main weather icon
//   const iconSrc = weatherIcons[currWeather] || "images/weather.png";
//   mainWeatherIcon.src = iconSrc;
//   sunriseValue.innerHTML = sunRise;
//   sunsetValue.innerHTML = sunSet;


//   /* --Why 40 Endpoints?? because:

// This API gives weather data every 3 hours
// For 5 days
// And 5 days × 8 (3-hour intervals per day) = 40 entries
// ✅ So each item in list[] is 3 hours apart — that’s why total 40. */


//   //--- Get hourly forecast

//   const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`;
//   const response3 = await fetch(forecast_url);
//   const forecastData = await response3.json();
//   console.log(forecastData.list);

//   /*---Why we need 6 enteries for next 18 hours because  ->each entry = 3 hours 6 entries × 3 hours = 18 hours ahead (almost next day morning/evening view) 
//   So,if you want next 6 hours, you take-the first 2 entries only. If you want next 12 hours, you take 4 entries If you want next 24 hours, you take 8 entries.*/

//   //Extracting hourly data from API nodelist
//   const hourlyData = forecastData.list.slice(0, 6);  ///extracting 6 arrays
//   console.log(hourlyData)
//   hourlyData.forEach((val, index) => {
//     const hourTemp = Math.floor(val.main.temp);
//     const hourwind = val.wind.speed;
//     const timestamp = val.dt * 1000;
//     // create Date object
//     const date = new Date(timestamp);
//     // get hours
//     let hours = date.getHours();
//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12;
//     hours = hours ? hours : 12; // 0 should be 12
//     // format final time
//     const finalHourTime = `${hours} ${ampm}`;
//     console.log(finalHourTime); // e.g. 12 PM, 3 PM, 6 PM

//     const weatherMain = val.weather[0].main;
//     const iconSrc = weatherIcons[weatherMain] || "images/weather.png"; // fallback if not found




//     //Select Specidifc Card
//     const card = hourCards[index]; //hey get me the .hour-all div that matches this index position. so the index=0 picks the first .hour-all div card and then we will extract the info like temp and wind and time from that specific card 
//     if (!card) return; //skip if fewer cards than data

//     const timeE1 = card.querySelector("p:nth-child(1)"); //selects first </p> which is time
//     const tempE1 = card.querySelector("p:nth-child(3)"); //selects third </p> which is tempperature
//     const windE1 = card.querySelector(".wind-speed-text")
//     const imgEl = card.querySelector("img");

//     //UPdate values 
//     timeE1.textContent = finalHourTime;
//     tempE1.textContent = `${hourTemp}°C`;
//     windE1.textContent = `${hourwind}km/h`
//     imgEl.src = iconSrc;
//   })

//   // --- 5 Day Forecast 
//   //fetching 5-days enteries(one for each day, around midday)
//   const dailyForecast = forecastData.list.filter((item) => {
//     return item.dt_txt.includes("12:00:00")
//   });
//   console.log(dailyForecast)

//   dailyForecast.forEach((arr, index) => {
//     const temp = Math.round(arr.main.temp);
//     const date = new Date(arr.dt_txt).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
//     const dcard = dayCards[index];
//     if (!dcard) return;

//     const tempE2 = dcard.querySelector("p:nth-child(2)");
//     const dateE2 = dcard.querySelector("p:nth-child(3)");
//     const weatherMain = arr.weather[0].main;

//     const iconSrc = weatherIcons[weatherMain] || "images/weather.png";
//     const imgEl = dcard.querySelector("img");
//     tempE2.textContent = `${temp}°C`
//     dateE2.textContent = `${date}`
//     imgEl.src = iconSrc;
//   })




//   // Extracting 
// }

// // Function to get current location
// currentLocationBtn.addEventListener("click", () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//   } else {
//     alert("Geolocation is not supported by your browser.");
//   }
// });

// function successCallback(position) {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;
//   console.log("Latitude:", lat, "Longitude:", lon);

//   // Now call weather function with these coordinates
//   getWeatherByCoords(lat, lon);
// }

// function errorCallback(error) {
//   alert("Unable to get your location. Please allow location access.");
//   console.error(error);
// }
// async function getWeatherByCoords(lat, lon) {
//   const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
//   const response = await fetch(api_url);
//   const weatherData = await response.json();

//   // Extract city name
//   const cityName = weatherData.name;
//   currcityName.innerHTML = cityName;

//   // Now just reuse your main display logic
//   // Instead of calling getWeatherData(), 
//   // call a new helper function that accepts weatherData directly
//   updateWeatherUI(weatherData);

//   // For 5-day forecast
//   const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
//   const response2 = await fetch(forecast_url);
//   const forecastData = await response2.json();

//   updateForecastUI(forecastData);
// }

const darkModeToggle = document.querySelector(".switch input");

// Listen for the change event on the checkbox
darkModeToggle.addEventListener("change", () => {
    // REVERSED LOGIC: If checked (ON), it's DARK mode, so REMOVE 'light-mode'
    // If unchecked (OFF), it's LIGHT mode, so ADD 'light-mode'
    if (darkModeToggle.checked) {
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
    }
});

// Optional: Add logic to apply the stored theme on page load
// You can place this function call at the very end of your script.js
(function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    // If the saved theme is 'light', we ADD the class and set the toggle to OFF (unchecked)
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        darkModeToggle.checked = false; // Toggle is OFF for Light Mode
    } else {
        // Default to dark mode. Toggle is ON (checked)
        document.body.classList.remove("light-mode");
        darkModeToggle.checked = true; // Toggle is ON for Dark Mode (default/saved)
    }
})();

// Call the function to set the initial state based on storage
// applySavedTheme();

// 💡 Initial Load Note: The HTML is set up by default for dark mode (no 'light-mode' class on body), 
// so we need to set the initial toggle state to checked (ON) as dark is the default.
// You might need to adjust the HTML or call applySavedTheme() to ensure the toggle is ON when the page loads to dark mode. 
// The initial state is handled by the function above.

const searchInput = document.getElementById("search_input");
const currentLocationBtn = document.querySelector(".btn");

const currcityName = document.querySelector(".city-name");
const currTime = document.querySelector(".current-time");
const dayDate = document.querySelector(".day-date")
const currentTemp = document.querySelector(".current-temp");
const feelsLike = document.querySelector(".feels-like");
const mainWeatherIcon = document.querySelector(".main-weather-icon") //main weather image icon on top
const mainWeather = document.getElementById("main")
const windspeedValue = document.getElementById("wind-speed");
const pressureValue = document.getElementById("pressure");
const humidityValue = document.getElementById("humidity-value");
const visibilityValue = document.getElementById("visibility")
const sunriseValue = document.getElementById("sunrise");
const sunsetValue = document.getElementById("sunset");

const weatherIcons = {
  Clear: "images/sun.png",
  Clouds: "images/cloudy.png",
  Rain: "images/heavy-rain.png",
  Thunderstorm: "images/storm.png",
  Haze: "images/haze.png"
}

//Selecting hourly Cards
const hourCards = document.querySelectorAll(".hour-all")
//Selecting day Cards
const dayCards = document.querySelectorAll(".day-all")

//SetTimeout with Debounce 
let typingTimer;
searchInput.addEventListener("input", (e) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    const cityName = e.target.value.trim();
    if (cityName) {
      getWeatherData(cityName);
    }
  }, 1000)
})

const api_key = "1cbe207627665a784928866b2665a1ca"

// --------------  MAIN FUNCTION FOR WEATHER BY CITY -----------------
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

  //--------------  Get current weatherData
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${api_key}&units=metric`
  const response2 = await fetch(api_url);
  const weatherData = await response2.json();

  // Call UI update helper
  updateWeatherUI(weatherData);

  //--- Get hourly + 5 Day forecast
  const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`;
  const response3 = await fetch(forecast_url);
  const forecastData = await response3.json();

  updateForecastUI(forecastData);
}


// ---------------------- UPDATE WEATHER UI ----------------------
function updateWeatherUI(weatherData) {
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

  //----converting time from seconds to localtime
  const timezoneOffset = weatherData.timezone; // in seconds
  const utc = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (timezoneOffset * 1000));

  //time only 
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const formattedTime = localTime.toLocaleTimeString('en-US', timeOptions);

  //date only 
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = localTime.toLocaleDateString('en-US', dateOptions);

  //Updating the value in DOM that we got from API
  currentTemp.innerHTML = `${temperature}°C`;
  feelsLike.innerHTML = `${feellikeTemp}°C`;
  humidityValue.innerHTML = `${humidity}%`;
  pressureValue.innerHTML = `${pressure}hPa`;
  windspeedValue.innerHTML = `${windSpeed}m/s`;
  visibilityValue.innerHTML = `${currVisibility}`;
  currcityName.innerHTML = city;
  currTime.innerHTML = `${formattedTime}`;
  dayDate.innerHTML = `${formattedDate}`;
  mainWeather.innerHTML = `${currWeather}`;

  // Update main weather icon
  const iconSrc = weatherIcons[currWeather] || "images/weather.png";
  mainWeatherIcon.src = iconSrc;
  sunriseValue.innerHTML = sunRise;
  sunsetValue.innerHTML = sunSet;
}


// ---------------------- UPDATE FORECAST UI ----------------------
function updateForecastUI(forecastData) {

  /* --Why 40 Endpoints?? because:
  This API gives weather data every 3 hours
  For 5 days
  And 5 days × 8 (3-hour intervals per day) = 40 entries
  ✅ So each item in list[] is 3 hours apart — that’s why total 40. */

  //Extracting hourly data from API nodelist
  const hourlyData = forecastData.list.slice(0, 6);  ///extracting 6 arrays
  hourlyData.forEach((val, index) => {
    const hourTemp = Math.floor(val.main.temp);
    const hourwind = val.wind.speed;
    const timestamp = val.dt * 1000;

    // create Date object
    const date = new Date(timestamp);
    // get hours
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const finalHourTime = `${hours} ${ampm}`;

    const weatherMain = val.weather[0].main;
    const iconSrc = weatherIcons[weatherMain] || "images/weather.png";

    const card = hourCards[index];
    if (!card) return;

    const timeE1 = card.querySelector("p:nth-child(1)");
    const tempE1 = card.querySelector("p:nth-child(3)");
    const windE1 = card.querySelector(".wind-speed-text");
    const imgEl = card.querySelector("img");

    timeE1.textContent = finalHourTime;
    tempE1.textContent = `${hourTemp}°C`;
    windE1.textContent = `${hourwind}km/h`;
    imgEl.src = iconSrc;
  });

  // --- 5 Day Forecast ---
  const dailyForecast = forecastData.list.filter((item) => {
    return item.dt_txt.includes("12:00:00");
  });

  dailyForecast.forEach((arr, index) => {
    const temp = Math.round(arr.main.temp);
    const date = new Date(arr.dt_txt).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
    const dcard = dayCards[index];
    if (!dcard) return;

    const tempE2 = dcard.querySelector("p:nth-child(2)");
    const dateE2 = dcard.querySelector("p:nth-child(3)");
    const weatherMain = arr.weather[0].main;
    const iconSrc = weatherIcons[weatherMain] || "images/weather.png";
    const imgEl = dcard.querySelector("img");

    tempE2.textContent = `${temp}°C`;
    dateE2.textContent = `${date}`;
    imgEl.src = iconSrc;
  });
}


// ---------------------- CURRENT LOCATION FEATURE ----------------------
currentLocationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});

function successCallback(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("Latitude:", lat, "Longitude:", lon);
  getWeatherByCoords(lat, lon);
}

function errorCallback(error) {
  alert("Unable to get your location. Please allow location access.");
  console.error(error);
}

async function getWeatherByCoords(lat, lon) {
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  const response = await fetch(api_url);
  const weatherData = await response.json();

  // Update weather instantly
  updateWeatherUI(weatherData);

  const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  const response2 = await fetch(forecast_url);
  const forecastData = await response2.json();

  updateForecastUI(forecastData);
}



