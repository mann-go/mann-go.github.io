const icons = { 
    cloudy: 'bx bx-cloud', 
    drizzle: 'bx bx-cloud-drizzle',
    rain: 'bx bx-cloud-rain',
    snow: 'bx bx-cloud-snow',
    sun: 'bx bx-sun',
}

export function renderWeatherItem(data) {

    if (!data) {
        console.log("no data");
        return;
    }
    const location = document.getElementById('location');
    location.textContent = `14 Day Forecast: ` + data.resolvedAddress;

    const weatherTemplate = document.getElementById('weather-container-template');
    const forecastTemplate = document.getElementById('forecast-item-template');
    const weatherBodyWrapper = document.querySelector('.weather-container-wrapper'); 

    if (!weatherTemplate || !forecastTemplate || !weatherBodyWrapper) {
        console.error("Missing templates or container in DOM");
        return;
    }

    if (weatherBodyWrapper.hasChildNodes()) {
        while (weatherBodyWrapper.firstChild) {
            weatherBodyWrapper.removeChild(weatherBodyWrapper.firstChild);
        }
    }

    for (const value of data.daysArray) {
        // Clone weather container template
        let weatherContainerTemplate = weatherTemplate.content.cloneNode(true);
        
        let date = weatherContainerTemplate.querySelector('.date');
        date.textContent = value.day;

        let conditions = weatherContainerTemplate.querySelector('.conditions');
        conditions.textContent = value.conditions;

        let currTemp = weatherContainerTemplate.querySelector('.curr-temp');
        currTemp.textContent += value.temp;

        let maxTemp = weatherContainerTemplate.querySelector('.max-temp');
        maxTemp.textContent += value.tempmax;

        let minTemp = weatherContainerTemplate.querySelector('.min-temp');
        minTemp.textContent += value.tempmin;

        let weatherItemBody = weatherContainerTemplate.querySelector('.weather-item-body'); 
        value.hours.forEach(element => {
            // Clone forecast item template
            let forecastItemTemplate = forecastTemplate.content.cloneNode(true);
            let forecastItem = forecastItemTemplate.querySelector('.forecast-item');

            for (const [key, val] of Object.entries(element)) {
                let content = forecastItem.querySelector(`.${key}`);
                if (content && key !== "icon") {
                    content.textContent += val;
                }

                if (content && key === "icon") {
                    let forecastIcon;
                    switch(true) {
                        case val.includes("cloudy"):
                            forecastIcon = forecastItem.querySelector(`.${key}`);
                            forecastIcon.className = icons.cloudy;
                            break;
                        case val.includes("drizzle"):
                            forecastIcon = forecastItem.querySelector(`.${key}`);
                            forecastIcon.className = icons.drizzle;
                        break;
                        case val.includes("rain"):
                            forecastIcon = forecastItem.querySelector(`.${key}`);
                            forecastIcon.className = icons.rain;
                        break;
                        case val.includes("snow"):
                            forecastIcon = forecastItem.querySelector(`.${key}`);
                            forecastIcon.className = icons.snow;
                        break;
                        case val.includes("sun"):
                            forecastIcon = forecastItem.querySelector(`.${key}`);
                            forecastIcon.className = icons.sun;
                        break;
                    }
                }
            }

            // Append each forecast item to the weather item body
            weatherItemBody.appendChild(forecastItem);
        });

        // Append filled weather container to the main wrapper
        weatherBodyWrapper.appendChild(weatherContainerTemplate);
    }
}
