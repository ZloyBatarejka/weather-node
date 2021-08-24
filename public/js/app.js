document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.WeatherForm-input');
    const form = document.querySelector('.WeatherForm');
    const errorContainer = document.querySelector('.WeatherContainer-error');
    const weatherContainer = document.querySelector('.WeatherContainer-message');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        errorContainer.innerHTML = '';
        weatherContainer.innerHTML = '';
        const location = input.value.trim().toLowerCase();
        if (!location.length) {
            errorContainer.innerHTML = 'Provide value';
            return;
        }
        fetch(`/weather?adress=${location}`)
        .then((data) => {
            data.json().then((data) => {
                if (data.error) {
                    errorContainer.innerHTML = data.error
                } else {
                    weatherContainer.innerHTML = `${data.forecastData.temperature} &#176, ${data.geoData.name}`
                }
            });
        })
    });
});

