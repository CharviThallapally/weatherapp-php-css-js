const searchInput = document.querySelector('#search');
const weatherData = document.querySelector('#weather-data');
const historyData = document.querySelector('#history-data');

async function fetchWeather() {
  const city = searchInput.value.trim();

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  try {
    const response = await fetch('weather.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `city=${encodeURIComponent(city)}`,
    });

    const data = await response.json();

    if (data.error) {
      weatherData.innerHTML = `<p>${data.error}</p>`;
    } else {
      weatherData.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
      weatherData.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
    weatherData.innerHTML = `<p>There was an error fetching the weather data. Please try again.</p>`;
  }

  fetchHistory();
}

async function fetchHistory() {
  try {
    const response = await fetch('history.php');
    const history = await response.json();

    historyData.innerHTML = '<h3>Search History</h3>';
    history.forEach((city) => {
      historyData.innerHTML += `<p>${city}</p>`;
    });
    historyData.style.display = 'block';
  } catch (error) {
    console.error(error);
  }
}
