//print date and hour
let now = new Date();
let year = now.getFullYear();

let monthName = [
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
let month = monthName[now.getMonth()];

let dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = dayName[now.getDay()];
let dayOfMonth = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let actualDate = document.querySelector("#actual-date");
actualDate.innerHTML = `${day} - ${month}, ${dayOfMonth} - ${year}`;

let actualHour = document.querySelector("#hour-infomation");
actualHour.innerHTML = `${hour}:${minutes}`;

let celsiusTemperature = null;
searchCity("London");

//print city form
function actualCity(event) {
  event.preventDefault();
  let userTypeCity = document.querySelector("#form-city");
  let cityValue = userTypeCity.value;
  userTypeCity.innerHTML = cityValue.value;

  let changeCity = document.querySelector("#city");
  changeCity.innerHTML = cityValue;

  searchCity(cityValue);
}

let formCity = document.querySelector("#searching");
formCity.addEventListener("submit", actualCity);

//change celsius-fahrenheit
function changeToCelsius() {
  let temperatureInCelsius = document.querySelector("#temperature");
  temperatureInCelsius.innerHTML = `${celsiusTemperature}ºC`;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);

function changeToFahrenheit() {
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}ºF`;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

function searchCity(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b91fc8da1e02bf608ec0e58160cf792&units=metric`;
  axios.get(apiURL).then(showForecast);
}

function getCoord(coordinates) {
  console.log(coordinates);
  let apiURL5Days = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=44cc1ee1b88cd46d5888ef7f472132d0
&unit+metric`;

  axios(apiURL5Days).then(showForecast5Days);
}

function showForecast(response) {
  celsiusTemperature = Math.round(response.data.main.temp);

  let currentyCity = document.querySelector("#city");
  currentyCity.innerHTML = response.data.name;

  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${celsiusTemperature}ºC`;

  let currentDescriprion = document.querySelector("#description");
  currentDescriprion.innerHTML = response.data.weather[0].description;

  let realFeal = document.querySelector("#realFeal");
  realFeal.innerHTML = Math.round(response.data.main.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );

  console.log(response);

  getCoord(response.data.coord);
}

function showForecast5Days() {
  let forecastElement = document.querySelector("#forecast");
  let day = ["14/01", "15/01", "16/01", "17/01"];
  let forecastHTML = " ";
  day.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
         <div class="col" id="forecast-date"> <span>Wed - </span> <span >${day}</span> </div>
        <div class="col" > <span id="forecast-temperature"> 15 </span> ºC</div>
        <div class="col" id="forecast-description">Sunny</div>
        <div class="col"> Min <span id="forecast-min">12</span> ºC<div>Max <span id="forecast-max"> 15 </span>ºC</div>
             
          </div>`;

    forecastElement.innerHTML = forecastHTML;
  });
}

showForecast5Days();

function forecastNextDays(response) {
  let firstDayTemperature = document.querySelector("#tempDay0");
  firstDayTemperature.innerHTML = response.daily[0].temp.day;
}
