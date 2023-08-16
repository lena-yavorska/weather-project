function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Suturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
      if (index < 6) {
      forecastHTML = forecastHTML + `
            <div class="col-2">
              <div class="weather-forecast-date">
                ${formatDay(forecastDay.dt)}
              </div>
               ${index}
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"><weather-forecast-temperatures></weather-forecast-temperatures>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-max">
                ${Math.round(forecastDay.temp.max)}°
                </span>
                <span class="weather-forecast-temperatures-min">
                ${Math.round(forecastDay.temp.min)}°
                </span>
              </div>
            </div>
          `;
      }
    })
          
          forecastHTML = forecastHTML+ `</div>`;
          forecastElement.innerHTML = forecastHTML;
          console.log(forecastHTML);
  }

  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let  apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  function displayWeatherCondition(response) {
    console.log(response.data);
  
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;

    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
    }
  
  function searchCity(city) {
    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    // debugger;
    event.preventDefault();
    let city  = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML  = Math.round(fahrenheitTemperature);
  }

  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature"); 
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }

  let celsiusTemperature = null;

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  
  searchCity("Lisbon");