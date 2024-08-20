let map;  // Global variable for the map

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return alert('Please enter a city name.');

    // Fetch weather data
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=26af18538d2dc65a06bc17163ee92e86&units=metric`);
    const weatherData = await weatherResponse.json();
    
    // Display weather data
    document.getElementById('weatherInfo').innerHTML = `
        <h2>${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
    `;

    // Fetch forecast data
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=26af18538d2dc65a06bc17163ee92e86&units=metric`);
    const forecastData = await forecastResponse.json();

    // Display forecast data
    let forecastHTML = '<h2>5-Day Forecast</h2>';
    forecastData.list.forEach((item, index) => {
        if (index % 8 === 0) { // Every 8th item corresponds to the same time each day
            forecastHTML += `
                <div>
                    <p>Date: ${item.dt_txt}</p>
                    <p>Temperature: ${item.main.temp}°C</p>
                    <p>Weather: ${item.weather[0].description}</p>
                </div>
            `;
        }
    });
    document.getElementById('forecastInfo').innerHTML = forecastHTML;

    // Initialize or update the Leaflet map
    if (!map) {
        map = L.map('map').setView([weatherData.coord.lat, weatherData.coord.lon], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    } else {
        map.setView([weatherData.coord.lat, weatherData.coord.lon], 10);  // Update map view
    }

    // Remove existing markers if any
    if (map.hasLayer(map.marker)) {
        map.removeLayer(map.marker);
    }

    // Add new marker
    map.marker = L.marker([weatherData.coord.lat, weatherData.coord.lon]).addTo(map)
        .bindPopup(`${weatherData.name}`)
        .openPopup();
}
