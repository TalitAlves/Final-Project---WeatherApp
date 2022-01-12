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
  axios.get(apiURL).then(updateEmojiWeather);
  //axios.get(apiURL).then(getLatitude);
  //axios.get(apiURL).then(getLongitude);
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
}

/*function getLatitude(response) {
 // let latitude = response.data.coord.lat;

  return latitude;
}*/

function getLongitude(response) {
  let longitude = response.data.coord.lon;

  return longitude;
}

function updateEmojiWeather(response) {
  let iconCode = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
}

function forecast5Days(latitude, longitude) {
  let apiURL5Days = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=0e49051742904728363d076005947b7c`;
  axios(apiURL5Days).then(forecastNextDays);

  console.log(apiURL5Days);
}
