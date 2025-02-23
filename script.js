const apiKey = "60246f5a42b2afa7d30f29e5f4bf207b"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector("#btn");
const weatherIcon = document.querySelector(".w1 img");

async function getWeather(city) {
    try {
        const encodedCity = encodeURIComponent(city.trim()); 
        const response = await fetch(`${apiUrl}${encodedCity},IN&appid=${apiKey}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch weather data.");
        }

        const data = await response.json();
        console.log("API Response:", data); 

        // Ensure required data exists
        if (!data.main || !data.weather) throw new Error("Incomplete weather data received.");

        // Update UI with fetched data
        document.querySelector("#city").innerText = data.name;
        document.querySelector("#temp").innerText = `${Math.round(data.main.temp)}°C`;
        document.querySelector("#dh").innerText = `${data.main.humidity}%`;
        document.querySelector("#dw").innerText = `${Math.round(data.wind.speed)} Km/hr`;

        // Change Weather Icon Based on Condition
        const weatherCondition = data.weather[0].main.toLowerCase();
        weatherIcon.src = weatherCondition.includes("clear") ? "day.svg" :
                          weatherCondition.includes("clouds") ? "cloudy.svg" :
                          weatherCondition.includes("rain") ? "rainy.svg" : "day.svg";

    } catch (error) {
        console.error("Weather Fetch Error:", error);
        alert(error.message);
    }
}

// Search Button Click Event
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        getWeather(searchBox.value);
    } else {
        alert("Please enter a city name!");
    }
});

// Enter Key Event for Search
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        getWeather(searchBox.value);
    }
});
