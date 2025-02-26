export function renderWeatherItem(data) {
    // console.log(data);

    const template = document.getElementById('forecast-item-template');
    const weatherBodyContainer = document.getElementById('weather-item-body');

    const date = document.getElementById('date');
    date.textContent = data[0].datetime;

    const conditions = document.getElementById('conditions');
    conditions.textContent = data[0].conditions;

    const avgTemp = document.getElementById('curr-temp');
    avgTemp.textContent = data[0].temp;

    for (const [key, value] of Object.entries(data)) {
        if (value.hours) {
            console.log(value.hours[0]);
            // Clone template content
            let weatherBodyItem = template.content.cloneNode(true);
            let forecastItem = weatherBodyItem.querySelector('.forecast-item');
            value.hours.forEach(element => {
                // document.getElementById(element).textContent = element;
            });
        }
    }

}