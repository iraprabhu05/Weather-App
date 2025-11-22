const apiKey = config.apiKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + '&appid=' + apiKey);
        if (!response.ok) {
            throw new Error(`City not found: ${city}`);
        }
        const data = await response.json();
        console.log(data);
        
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".details .col:nth-child(1) span").textContent = "Humidity: " + data.main.humidity + "%";
        document.querySelector(".details .col:nth-child(2) span").textContent = "Wind Speed: " + data.wind.speed + " km/h";
      
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(error.message); 
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city); 
    } else {
        alert("Please enter a city name"); 
    }
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
