const button = document.getElementById("getWeatherBtn");
const input = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

const apiKey = "2f90703e8c3245c8a5a181954252308"; // WeatherAPI.com key

button.addEventListener("click", async () => {
  const city = input.value.trim();

  if (city === "") {
    result.textContent = " Please Enter The City";
    return;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );

    if (!response.ok) {
      result.textContent = " City Not Found";
      return;
    }

    const data = await response.json();
    console.log(data); // Debugging: check the API structure

    if (!data.location || !data.current) {
      result.textContent = " Unexpected API Response";
      return;
    }

    const cityName = data.location.name;
    const country = data.location.country;
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;

    result.textContent = ` ${cityName}, ${country} →  ${temperature}°C , ${condition}`;
  } catch (error) {
    result.textContent = " Error in Fetching Weather Details";
    console.error(error);
  }
});
