import { dayObject } from "../../api/visual-crossing/dayObject";
import { hourObject } from "../../api/visual-crossing/hourObject";
import { renderError } from "./ui/renderError";
import { renderWeatherItem } from "./ui/renderWeatherItem";

const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'; 
const apiKey = 'key=RJKAGKTXNGDLPHYW6PU6ZZ3TM&';
let unitGroup = `?unitGroup=`;
let options = '&include=days%2Chours&';
let contentType = `contentType=json`;

export async function getWeatherByLocation(location, units) {
    location = location.trim();
    unitGroup += units;
    try {
        const response = await fetchWeather(location, unitGroup, options)
        const body = await response.json();
        renderWeatherItem(processWeatherByLocation(body));

        if (!response.ok) {
            renderError(location);
            throw new Error(`Error grabbing weather by location.`);
        }
        
    } catch (error) {
        renderError(location);
        console.log(error);
    }
    // Goofy ahh fix, removes the appended `unit` to unitGroup
    unitGroup = unitGroup.substring(0, unitGroup.length - 2);
}

function processWeatherByLocation(data) {
    let resolvedAddress = data.resolvedAddress;
    let daysArray = [];
    data.days.map((day) => {
        daysArray.push(new dayObject(
            day.datetime,
            getWeekDay(day.datetime),
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
                hour.datetime.substring(0, 5),
                hour.temp,
                hour.feelslike,
                hour.humidity,
                hour.precip + `mm`,
                hour.precipprob + `%`,
                hour.conditions,
                hour.icon
            )) : [] 
        ));
    });

    return {resolvedAddress, daysArray};
}

async function fetchWeather(location, unitGroup, options) {
    const request = baseURL + location + unitGroup + options + apiKey + contentType; 
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

// Helper function to get current dates day
function getWeekDay(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
}