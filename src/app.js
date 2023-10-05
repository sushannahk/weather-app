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

	let currentTemperature = Math.round(response.data.main.temp);
	let currentCity = response.data.name;
	let currentWind = response.data.wind.speed;
	let currentHumidity = response.data.main.humidity;

	temperatureElement.innerHTML = currentTemperature;
	windElement.innerHTML = `Wind ${currentWind}km/h`;
	humidityElement.innerHTML = `Humidity ${currentHumidity}%`;
	cityElement.innerHTML = currentCity;
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

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

let currentPositionButton = document.querySelector("#current-btn");
currentPositionButton.addEventListener("click", currentPosition);

searchCity("Warszawa");
