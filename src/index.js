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

//get curent position
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat, lon);

  let apiPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=44cc1ee1b88cd46d5888ef7f472132d0&units=metric`;

  axios.get(apiPosition).then(forecastbyCoords);
}

function getPosition(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getPosition);

let formCity = document.querySelector("#searching");
formCity.addEventListener("submit", actualCity);

function searchCity(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be6b7be8648f159d58bb9b1cafad31b5&units=metric`;
  axios.get(apiURL).then(showForecast);
}

function getCoord(coordinates) {
  let apiURL5Days = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=44cc1ee1b88cd46d5888ef7f472132d0
&units=metric`;

  axios(apiURL5Days).then(showForecast5Days);
}

function forecastbyCoords(response) {
  console.log(response);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

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
  getCoord(response.data.coord);
}

function showForecast(response) {
  celsiusTemperature = Math.round(response.data.main.temp);

  let currentyCity = document.querySelector("#city");
  currentyCity.innerHTML = response.data.name;

  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${celsiusTemperature}`;

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

  getCoord(response.data.coord);
}

function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekDay = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
  let days = weekDay[date.getDay()];
  let fullDate = days;

  return fullDate;
}

function showForecast5Days(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;

  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col" id="forecast-date">
                <div id="weekDay">${forecastDate(forecastDay.dt)}</div>

                <div>
                  <span id="temperature5Days">${Math.round(
                    forecastDay.temp.day
                  )}ºC</span>
                  </div>
                  <div>
                    <img
                      id="icon5Days"
                      src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      alt=""
                      width="70px"
                    />
                  </div>
                  <div id="forecast-description">Sunny</div>
                  <div>
                    <span class="max" id="max">${Math.round(
                      forecastDay.temp.max
                    )}º </span>
                    <span class="min" id="min">${Math.round(
                      forecastDay.temp.min
                    )}º</span>
                  </div>
                  </div>`;
    }
  });
  forecastHTML = forecastHTML;
  forecastElement.innerHTML = forecastHTML;
}
