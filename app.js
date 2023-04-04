const API_KEY = "dde669c54dbec53c562abad52d716702";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const inp = document.querySelector(".input");
const btn = document.querySelector(".btn");
const card = document.querySelector(".card");

async function getData(city) {
  const data = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const response = await data.json();
  return response;
}

btn.addEventListener("click", () => {
  const city = inp.value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  getData(city).then((res) => {
    console.log(res);

    if (res.cod === "404") {
      alert("City not found. Please enter a valid city name.");
      return;
    }

    const previousWeather = card.querySelectorAll("p, img");
    previousWeather.forEach((el) => el.remove());

    const cityName = document.createElement("p");
    cityName.innerText = `City: ${res.name}`;
    card.appendChild(cityName);

    const maxTemp = document.createElement("p");
    maxTemp.innerText = `Max Temperature: ${res.main.temp_max} °C`;
    card.appendChild(maxTemp);

    const minTemp = document.createElement("p");
    minTemp.innerText = `Min Temperature: ${res.main.temp_min} °C`;
    card.appendChild(minTemp);

    const icon = document.createElement("img");
    icon.src = `https://openweathermap.org/img/wn/${res.weather[0].icon}.png`;
    card.appendChild(icon);
  });
});
