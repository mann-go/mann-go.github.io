export function renderError(location) {
    const weatherContainerWrapper = document.querySelector('.weather-container-wrapper');

    if (weatherContainerWrapper.hasChildNodes()) {
        while (weatherContainerWrapper.firstChild) {
            weatherContainerWrapper.removeChild(weatherContainerWrapper.firstChild);
        }
    }

    const locationHeader = document.querySelector("#location");
    locationHeader.textContent = "";

    const errorDiv = document.createElement('div');
    errorDiv.className = "error";
    errorDiv.id = "error";

    const errorMsg = document.createElement('h2');
    errorMsg.textContent = `There was an error querying '${location}'. `;
    errorMsg.textContent += `Please try again or enter a valid location. `;
    errorDiv.appendChild(errorMsg);

    weatherContainerWrapper.appendChild(errorDiv);

}
