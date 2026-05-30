// ---- CONFIGURATION ----
const apiKey = "7965ff71c7d9d3fece0ba8ce14befcb0"; 
const lat = "34.0549";  // Replace with your chamber city latitude
const lon = "118.2426"; // Replace with your chamber city longitude

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const membersUrl = "./data/members.json"; 

// ---- FETCH & DISPLAY WEATHER ----
async function loadWeather() {
    try {
        // Fetch current weather
        const resCurrent = await fetch(currentWeatherUrl);
        const currentData = await resCurrent.json();
        
        document.getElementById("current-temp").textContent = Math.round(currentData.main.temp);
        document.getElementById("weather-desc").textContent = currentData.weather[0].description;

        // Fetch forecast
        const resForecast = await fetch(forecastUrl);
        const forecastData = await resForecast.json();
        
        // Filter for noon forecasts (every 24 hours) and grab 3 days
        const dailyData = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
        const forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = ""; // Clear placeholders

        dailyData.forEach(day => {
            const dayName = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
            const temp = Math.round(day.main.temp);
            forecastContainer.innerHTML += `<div class="forecast-day"><strong>${dayName}</strong>: ${temp}°F</div>`;
        });
    } catch (err) {
        console.error("Weather error:", err);
    }
}

// ---- FETCH & DISPLAY SPOTLIGHTS ----
async function loadSpotlights() {
    try {
        const res = await fetch(membersUrl);
        const members = await res.json();

        // Shuffle array and pick 2-3 members
        const shuffled = members.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        const container = document.getElementById("spotlight-container");
        if (!container) return;
        container.innerHTML = ""; // Clear loading message

        selected.forEach(member => {
            const tier = member.membershipLevel || '1';
            const name = member.companyName || member.name || 'Member';
            const address = typeof member.address === 'string'
                ? member.address
                : `${member.address.street}, ${member.address.city}, ${member.address.state} ${member.address.zip}`;

            container.innerHTML += `
                <article class="spotlight-card tier-${tier}">
                    <h3>${name}</h3>
                    <img src="${member.image ? `images/${member.image}` : 'images/placeholder.webp'}" alt="${name} Logo" loading="lazy" width="150">
                    <p class="membership-badge">Tier ${tier}</p>
                    <hr>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                </article>
            `;
        });
    } catch (err) {
        console.error("Spotlight error:", err);
    }
}