import { getWeatherByLocation } from "../features/weather/weatherController";

const forms = [
    { id: 'weather-forecast-form', action: submitWeatherForecastRequest},
]

function submitWeatherForecastRequest(e) {
    e.preventDefault();
    let location = e.target[0].value;
    getWeatherByLocation(location);

    
}

forms.forEach(({id, action}) => {
    document.getElementById(id).addEventListener("submit", action);
});