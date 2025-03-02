import { getWeatherByLocation } from "../features/weather/weatherController";

const forms = [
    { id: 'weather-forecast-form', action: submitWeatherForecastRequest},
]

function submitWeatherForecastRequest(e) {
    e.preventDefault();
    // Get location
    let location = e.target[0].value;
    // Get unit input - fahrenheit or degrees
    let unitsInput = document.getElementById('fahrenheit-or-degree');
    let units = unitsInput.checked ? "uk" : "us";

    let weatherContainerWrapper = document.querySelector('.weather-container-wrapper');
    weatherContainerWrapper.style.display = "flex";
    
    if (weatherContainerWrapper.hasChildNodes()) {
        while (weatherContainerWrapper.firstChild) {
            weatherContainerWrapper.removeChild(weatherContainerWrapper.firstChild);
        }
    }

    // Append loader animation
    let loader = document.createElement('div');
    loader.className = "loader";
    weatherContainerWrapper.appendChild(loader);

    getWeatherByLocation(location, units);
}

forms.forEach(({id, action}) => {
    document.getElementById(id).addEventListener("submit", action);
});