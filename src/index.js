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

function searchCity(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b91fc8da1e02bf608ec0e58160cf792&units=metric`;
  axios.get(apiURL).then(showForecast);
}

function getCoord(coordinates) {
  let apiURL5Days = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=44cc1ee1b88cd46d5888ef7f472132d0
&units=metric`;

  axios(apiURL5Days).then(showForecast5Days);
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
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;

  let days = ["Thus", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col" id="forecast-date">
                <div id="weekDay">Fri</div>

                <div>
                  <span id="temperature5Days">15</span><span>ºC</span>
                  </div>
                  <div>
                    <img
                      id="icon5Days"
                      src="http://openweathermap.org/img/wn/10d@2x.png"
                      alt=""
                      width="60px"
                    />
                  </div>
                  <div id="forecast-description">Sunny</div>
                  <div>
                    <span class="max" id="max">15</span> <span>º </span>
                    <span class="min" id="min">12</span> <span>º</span>
                  </div>
                  </div>`;

    let dtAPI = response.data.daily[1].dt;
    let weekDay = document.querySelector("#weekDay");
    weekDay.innerHTML = `${forecastDate(dtAPI)}`;

    let temperature5Days = document.querySelector("#temperature5Days");
    temperature5Days.innerHTML = Math.round(response.data.daily[1].temp.day);
    let icon5Days = document.querySelector("#icon5Days");
    icon5DaysCode = response.data.daily[1].weather[0].icon;
    icon5Days.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon5DaysCode}@2x.png`
    );
    let min5Days = document.querySelector("#min");
    min5Days.innerHTML = Math.round(response.data.daily[1].temp.min);
    let max5Days = document.querySelector("#max");
    max5Days.innerHTML = Math.round(response.data.daily[1].temp.max);
  });
  forecastHTML = forecastHTML;
  forecastElement.innerHTML = forecastHTML;

  let dtAPI = response.data.daily[1].dt;
  let weekDay = document.querySelector("#weekDay");
  weekDay.innerHTML = `${forecastDate(dtAPI)}`;

  let temperature5Days = document.querySelector("#temperature5Days");
  temperature5Days.innerHTML = Math.round(response.data.daily[1].temp.day);
  let icon5Days = document.querySelector("#icon5Days");
  icon5DaysCode = response.data.daily[1].weather[0].icon;
  icon5Days.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon5DaysCode}@2x.png`
  );
  let min5Days = document.querySelector("#min");
  min5Days.innerHTML = Math.round(response.data.daily[1].temp.min);
  let max5Days = document.querySelector("#max");
  max5Days.innerHTML = Math.round(response.data.daily[1].temp.max);
}

function forecastNextDays(response) {
  let firstDayTemperature = document.querySelector("#tempDay0");
  firstDayTemperature.innerHTML = response.daily[0].temp.day;
}
