function formatDate(date) {
	const weekDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let weekDay = date.getDay();
	let day = weekDays[weekDay];
	let hour = date.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	return `${day} ${hour}:${minutes}`;
}

function showWeather(response) {
	let temperatureElement = document.querySelector("#temperature-value");
	let cityElement = document.querySelector("#city-name");
	let windElement = document.querySelector("#wind");
	let humidityElement = document.querySelector("#humidity");
	let descriptionElement = document.querySelector("#weather-description");
	let iconElement = document.querySelector("#weather-icon");

	let currentTemperature = Math.round(response.data.main.temp);
	let currentCity = response.data.name;
	let currentWind = response.data.wind.speed;
	let currentHumidity = response.data.main.humidity;
	let currentDescription = response.data.weather[0].description;
	let currentIcon = response.data.weather[0].icon;

	celsiusTemperature = currentTemperature;
	temperatureElement.innerHTML = currentTemperature;
	windElement.innerHTML = `wind ${currentWind}km/h`;
	humidityElement.innerHTML = `humidity ${currentHumidity}%`;
	cityElement.innerHTML = currentCity;
	descriptionElement.innerHTML = currentDescription;
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${currentIcon}.png`
	);
	iconElement.setAttribute("alt", "currentDescription");
}

function searchCity(city) {
	let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInput = document.querySelector("#input-city");
	let city = cityInput.value;
	searchCity(city);
}

function getPosition(position) {
	let lon = position.coords.longitude;
	let lat = position.coords.latitude;
	let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showWeather);
}

function currentPosition() {
	navigator.geolocation.getCurrentPosition(getPosition);
}

function showFahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature-value");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
	fahrenheitElement.classList.remove("convert");
	celsiusElement.classList.add("convert");
}

function showCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature-value");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
	fahrenheitElement.classList.add("convert");
	celsiusElement.classList.remove("convert");
}

function showForecast() {
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = `<div class="row">`;
	let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			`
                    <div class="col-2">
                        <div class="weather-forecast-date">
                            ${day}
                        </div>
                        <img src="https://openweathermap.org/img/wn/10d.png" alt="">
                        <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-max">
                                18°
                            </span>
                            <span class="weather-forecast-temperature-min">
                                12°
                            </span>
                        </div>
                    </div>
		`;
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;
let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

let currentPositionButton = document.querySelector("#current-btn");
currentPositionButton.addEventListener("click", currentPosition);

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", showFahrenheit);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", showCelsius);

searchCity("Warszawa");
showForecast();
