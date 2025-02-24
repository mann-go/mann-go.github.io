import { dayObject } from "../../api/visual-crossing/dayObject";
import { hourObject } from "../../api/visual-crossing/hourObject";

const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'; 
const apiKey = 'key=RJKAGKTXNGDLPHYW6PU6ZZ3TM&';
let options = '?unitGroup=uk&include=days%2Chours&';
let contentType = `contentType=json`;

const days = [];

export async function getWeatherByLocation(location) {
    location = location.trim();
    try {
        const response = await fetchWeather(location, options)
        const body = await response.json();
        processWeatherByLocation(body);
        console.log(days);
        if (!response.ok) {
            throw new Error(`Error grabbing weather by location.`);
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function fetchWeather(location, options) {
    const request = baseURL + location + options + apiKey + contentType; 
    try {  
        const response = await fetch(request)   

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error(error.message);
    }
}

function processWeatherByLocation(data) {
    console.log(data.days);
    data.days.map((day) => {
        days.push(new dayObject(
            day.datetime,
            day.tempmax,
            day.tempmin,
            day.temp,
            day.feelslikemax,
            day.feelslikemin,
            day.feelslike,
            day.dew,
            day.humidity,
            day.precip,
            day.precipprob,
            day.precipcover,
            day.preciptype,
            day.sunrise,
            day.sunset,
            day.conditions,
            day.description,
            day.icon,
            day.hours ? day.hours.map((hour) => new hourObject(
                hour.datetime,
                hour.temp,
                hour.feelslike,
                hour.humidity,
                hour.conditions,
                hour.icon
            )) : [] 
        ));
    });
}
