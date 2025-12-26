const userlocation = document.getElementById("userlocation");
const searchIcon = document.querySelector(".fa-search");

const converter = document.getElementById("converter");
const weatherIcon = document.querySelector(".weatherIcon");
const temperature = document.querySelector(".temperature");
const feelslike = document.querySelector(".feelslike");
const description = document.querySelector(".description");
const date = document.querySelector(".date");
const city = document.querySelector(".city");

const Hvalue = document.getElementById("Hvalue");
const Wvalue = document.getElementById("Wvalue");
const SRvalue = document.getElementById("SRvalue");
const SSvalue = document.getElementById("SSvalue");
const Cvalue = document.getElementById("Cvalue");
const UVvalue = document.getElementById("UVvalue");
const Pvalue = document.getElementById("Pvalue");

const forecast = document.querySelector(".forecast");

const API_KEY = "6710eaf036d54a0aa4e144215252612";

function finduserlocation() {
  const location = userlocation.value.trim();

  console.log("City entered:", location); // 🔍 debug

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const WEATHER_API_ENDPOINT =
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=7`;

  fetch(WEATHER_API_ENDPOINT )
    .then(response => response.json())
    .then(data => {
      console.log(data.location.lat,data.location.lon);
      console.log(data);
    city.innerHTML=data.location.name + "," + data.location.country
    weatherIcon.innerHTML = `<img src="https:${data.current.condition.icon}" alt="weather icon">`;
    if (converter.value === "C") {
        temperature.innerHTML = `${data.current.temp_c}°C`;
        feelslike.innerHTML="Feels like " + `${data.current.feelslike_c}°C`;
        description.innerHTML=`<i class="fa-brands fa-cloudversify"></i> &nbsp;`+ data.current.condition.text;
    } else {
        temperature.innerHTML = `${data.current.temp_f}°F`;
        feelslike.innerHTML="Feels like " + `${data.current.feelslike_f}°F`;
        description.innerHTML=`<i class="fa-brands fa-cloudversify"></i> &nbsp;`+ data.current.condition.text;
    }
    
    const rawDateTime = data.location.localtime; 

    const formattedDateTime = new Date(rawDateTime).toLocaleString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
    });

    date.innerHTML = formattedDateTime;

    Hvalue.innerHTML=Math.round(data.current.humidity)+ "<span>%<span></span>";
    Wvalue.innerHTML=Math.round(data.current.wind_kph) + "<span>km/h<span></span>";
    SRvalue.innerHTML=data.forecast.forecastday[0].astro.sunrise;;
    SSvalue.innerHTML=data.forecast.forecastday[0].astro.sunset;
    Cvalue.innerHTML=data.current.cloud + "<span>%<span></span>";
    UVvalue.innerHTML=data.current.uv;
    Pvalue.innerHTML=data.current.pressure_mb + "<span>hPa<span></span>";

})
    
    .catch(error => console.error("Fetch error:", error));
}

searchIcon.addEventListener("click", finduserlocation);

