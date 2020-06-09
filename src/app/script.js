const description = {
    200: `Thunderstorm with light rain`,
    201: `Thunderstorm with rain`,
    202: `Thunderstorm with heavy rain`,
    230: `Thunderstorm with light drizzle`,
    231: `Thunderstorm with drizzle`,
    232: `Thunderstorm with heavy drizzle`,
    233: `Thunderstorm with Hail`,
    300: `Light Drizzle`,
    301: `Drizzle`,
    302: `Heavy Drizzle`,
    500: `Light Rain`,
    501: `Moderate Rain`,
    502: `Heavy Rain`,
    511: `Freezing rain`,
    520: `Light shower rain`,
    521: `Shower rain`,
    522: `Heavy shower rain`,
    600: `Light snow`,
    601: `Snow`,
    602: `Heavy Snow`,
    610: `Mix snow/rain`,
    611: `Sleet`,
    612: `Heavy sleet`,
    621: `Snow shower`,
    622: `Heavy snow shower`,
    623: `Flurries`,
    700: `Mist`,
    711: `Smoke`,
    721: `Haze`,
    731: `Sand/dust`,
    741: `Fog`,
    751: `Freezing Fog`,
    800: `Clear sky`,
    801: `Few clouds`,
    802: `Scattered clouds`,
    803: `Broken clouds`,
    804: `Overcast clouds`,
    900: `Unknown Precipitation`
  }

const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const dayFullNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

async function findCity() {
    request = searchInput.value;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${request}&key=e21ac3d6aaa8465aac512ba3cd57a3f2&language=en&pretty=1`;
    let response = await fetch(url);
    let result = await response.json();
    console.log(result);

    const urlWeather = `https://api.weatherbit.io/v2.0/forecast/daily?city=${request}&units=metric&days=4&units=S&lang=en&key=73a61a88747f47e5b5b26d3285f6a978`;
    let resp = await fetch(urlWeather);
    let res = await resp.json();
    console.log(res);

    if (request.length !== 0) {
        map.flyTo({
            center: [result.results[0].geometry.lng,result.results[0].geometry.lat],
            essential: true
        });
    }
    var longitude = result.results[0].geometry.lng;
    var latitude = result.results[0].geometry.lat;
    document.querySelector('.longitude').innerHTML = `Longitude: ${longitude.toFixed(0)}*${Math.round((longitude % 1) * 60)}'`;
    document.querySelector('.latitude').innerHTML = `Latitude: ${latitude.toFixed(0)}*${Math.round((latitude % 1) * 60)}'`;

    if (result.results[0].components.city !== undefined) {
        cityName.innerHTML = `${result.results[0].components.city}, ${result.results[0].components.country}`;
    } else if (result.results[0].components.state !== undefined) {
        cityName.innerHTML = `${result.results[0].components.state}, ${result.results[0].components.country}`;
    } else {
        cityName.innerHTML = `${result.results[0].formatted}`;
    }

    numberOfTemp = Math.round(res.data[0].temp);
    temperature.innerHTML = `${numberOfTemp}<span>°</span>`;
    celsium.classList.add('active');
    farenheit.classList.remove('active');
    status.innerHTML = `${res.data[0].weather.description}`;
    dayTime.innerHTML = `${result.timestamp.created_http}`;
    feelsLike.innerHTML = `Feels like:  ${Math.round(res.data[0].temp + 1.9)}<span>°</span>`;
    wind.innerHTML = `Wind:  ${Math.round(res.data[0].wind_spd)} m/s`;
    humidity.innerHTML = `Humidity:  ${Math.round(res.data[0].rh)} %`;

    var currentDayName = result.timestamp.created_http.split(' ');
    var halfDay = currentDayName[4].split(':');
    console.log(halfDay);
    var halfNameDay = currentDayName[0].split(',');
    console.log(halfNameDay);
    celsium.classList.add('active');

    if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[0].weather.code > 799 && res.data[0].weather.code < 801) {
        weatherImage.innerHTML = `<img src="./images/day.svg" alt="">`;
    } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[0].weather.code > 799 && res.data[0].weather.code < 801) {
        weatherImage.innerHTML = `<img src="./images/night.svg" alt="">`;
    } else if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[0].weather.code > 800 && res.data[0].weather.code < 803) {
        weatherImage.innerHTML = `<img src="./images/cloudy-day.svg" alt="">`;
    } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[0].weather.code > 800 && res.data[0].weather.code < 803) {
        weatherImage.innerHTML = `<img src="./images/cloudy-night.svg" alt="">`;
    } else if (res.data[0].weather.code > 199 && res.data[0].weather.code < 234) {
        weatherImage.innerHTML = `<img src="./images/thunder.svg" alt="">`;
    } else if (res.data[0].weather.code > 299 && res.data[0].weather.code < 523) {
        weatherImage.innerHTML = `<img src="./images/rainy.svg" alt="">`;
    } else if (res.data[0].weather.code > 599 && res.data[0].weather.code < 623) {
        weatherImage.innerHTML = `<img src="./images/snowy.svg" alt="">`;
    } else {
        weatherImage.innerHTML = `<img src="./images/cloudy.svg" alt="">`;
    }

    for (i=0; i<dayNames.length; i++) {
        if (dayNames[i] === halfNameDay[0]) {
            var secondDayName = `${dayFullNames[i+1]}`;
            var thirdDayName = `${dayFullNames[i+2]}`;
            var fourthDayName = `${dayFullNames[i+3]}`;

            if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[1].weather.code > 799 && res.data[1].weather.code < 801) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[1].weather.code > 799 && res.data[1].weather.code < 801) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/night.svg" alt="">`;
            } else if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[1].weather.code > 800 && res.data[1].weather.code < 803) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/cloudy-day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[1].weather.code > 800 && res.data[1].weather.code < 803) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/cloudy-night.svg" alt="">`;
            } else if (res.data[1].weather.code > 199 && res.data[1].weather.code < 234) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/thunder.svg" alt="">`;
            } else if (res.data[1].weather.code > 299 && res.data[1].weather.code < 523) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/rainy.svg" alt="">`;
            } else if (res.data[1].weather.code > 599 && res.data[1].weather.code < 623) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/snowy.svg" alt="">`;
            } else {
                daySecond.innerHTML = `${secondDayName} <img src="./images/cloudy.svg" alt="">`;
            }

            if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[2].weather.code > 799 && res.data[2].weather.code < 801) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[2].weather.code > 799 && res.data[2].weather.code < 801) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/night.svg" alt="">`;
            } else if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[2].weather.code > 800 && res.data[2].weather.code < 803) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/cloudy-day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[2].weather.code > 800 && res.data[2].weather.code < 803) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/cloudy-night.svg" alt="">`;
            } else if (res.data[2].weather.code > 199 && res.data[2].weather.code < 234) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/thunder.svg" alt="">`;
            } else if (res.data[2].weather.code > 299 && res.data[2].weather.code < 523) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/rainy.svg" alt="">`;
            } else if (res.data[2].weather.code > 599 && res.data[2].weather.code < 623) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/snowy.svg" alt="">`;
            } else {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/cloudy.svg" alt="">`;
            }

            if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[3].weather.code > 799 && res.data[3].weather.code < 801) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[3].weather.code > 799 && res.data[3].weather.code < 801) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/night.svg" alt="">`;
            } else if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[3].weather.code > 800 && res.data[3].weather.code < 803) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/cloudy-day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[3].weather.code > 800 && res.data[3].weather.code < 803) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/cloudy-night.svg" alt="">`;
            } else if (res.data[3].weather.code > 199 && res.data[3].weather.code < 234) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/thunder.svg" alt="">`;
            } else if (res.data[3].weather.code > 299 && res.data[3].weather.code < 523) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/rainy.svg" alt="">`;
            } else if (res.data[3].weather.code > 599 && res.data[3].weather.code < 623) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/snowy.svg" alt="">`;
            } else {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/cloudy.svg" alt="">`;
            }

            numberOfTemp1 = Math.round(res.data[1].temp);
            tempSecond.innerHTML = `${numberOfTemp1}<span>°</span>`;
            numberOfTemp2 = Math.round(res.data[2].temp);
            tempThird.innerHTML = `${numberOfTemp2}<span>°</span>`;
            numberOfTemp3 = Math.round(res.data[3].temp);
            tempFourth.innerHTML = `${numberOfTemp3}<span>°</span>`;
        }
    }
}

async function refresh() {
    request = searchInput.value;
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${request},center,city,building&client_id=zpTGacauNJz2VKMgB4HLLOTLtXOpFgj-FbAbaBB6_fQ`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular)

    var img = document.createElement('img');
    document.getElementById('body').appendChild(img);
    img.src = data.urls.regular;
}

async function cityCurrentInfo() {
    const urlGeo = `https://api.ipgeolocation.io/getip`;
    let response = await fetch(urlGeo);
    let result = await response.json();
    console.log(result);

    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=d4bb619ea6d8448d8cececcdb28b1cb7&ip=${result.ip}&fields=city,country_name,country_code2`;
    let rspns = await fetch(url);
    let rslt = await rspns.json();
    console.log(rslt);

    request = rslt.city;
    const urlWeather = `https://api.weatherbit.io/v2.0/forecast/daily?city=${rslt.city}&country=${rslt.country_code2}&units=metric&days=4&units=S&lang=en&key=73a61a88747f47e5b5b26d3285f6a978`;
    let resp = await fetch(urlWeather);
    let res = await resp.json();
    console.log(res);
    
    const urlFullInfo = `https://api.opencagedata.com/geocode/v1/json?q=${request}&key=e21ac3d6aaa8465aac512ba3cd57a3f2&language=en&pretty=1`;
    let responsible = await fetch(urlFullInfo);
    let results = await responsible.json();
    console.log(results);

    var longitude = results.results[0].geometry.lng;
    var latitude = results.results[0].geometry.lat;
    document.querySelector('.longitude').innerHTML = `Longitude: ${longitude.toFixed(0)}*${Math.round((longitude % 1) * 60)}'`;
    document.querySelector('.latitude').innerHTML = `Latitude: ${latitude.toFixed(0)}*${Math.round((latitude % 1) * 60)}'`;

    if (results.results[0].components.city !== undefined) {
        cityName.innerHTML = `${results.results[0].components.city}, ${results.results[0].components.country}`;
    } else if (results.results[0].components.state !== undefined) {
        cityName.innerHTML = `${results.results[0].components.state}, ${results.results[0].components.country}`;
    } else {
        cityName.innerHTML = `${results.results[0].formatted}`;
    }
    
    numberOfTemp = Math.round(res.data[0].temp);
    temperature.innerHTML = `${numberOfTemp}<span>°</span>`;
    status.innerHTML = `${res.data[0].weather.description}`;
    dayTime.innerHTML = `${results.timestamp.created_http}`;
    celsium.classList.add('active');

    var currentDayName = results.timestamp.created_http.split(' ');
    var halfDay = currentDayName[4].split(':');
    console.log(halfDay);
    var halfNameDay = currentDayName[0].split(',');
    console.log(halfNameDay);  

    if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[0].weather.code > 799 && res.data[0].weather.code < 801) {
        weatherImage.innerHTML = `<img src="./images/day.svg" alt="">`;
    } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[0].weather.code > 799 && res.data[0].weather.code < 801) {
        weatherImage.innerHTML = `<img src="./images/night.svg" alt="">`;
    } else if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[0].weather.code > 800 && res.data[0].weather.code < 803) {
        weatherImage.innerHTML = `<img src="./images/cloudy-day.svg" alt="">`;
    } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[0].weather.code > 800 && res.data[0].weather.code < 803) {
        weatherImage.innerHTML = `<img src="./images/cloudy-night.svg" alt="">`;
    } else if (res.data[0].weather.code > 199 && res.data[0].weather.code < 234) {
        weatherImage.innerHTML = `<img src="./images/thunder.svg" alt="">`;
    } else if (res.data[0].weather.code > 299 && res.data[0].weather.code < 523) {
        weatherImage.innerHTML = `<img src="./images/rainy.svg" alt="">`;
    } else if (res.data[0].weather.code > 599 && res.data[0].weather.code < 623) {
        weatherImage.innerHTML = `<img src="./images/snowy.svg" alt="">`;
    } else {
        weatherImage.innerHTML = `<img src="./images/cloudy.svg" alt="">`;
    }

    feelsLike.innerHTML = `Feels like:  ${Math.round(res.data[0].temp + 1.9)}<span>°</span>`;
    wind.innerHTML = `Wind:  ${Math.round(res.data[0].wind_spd)} m/s`;
    humidity.innerHTML = `Humidity:  ${Math.round(res.data[0].rh)} %`;

    for (i=0; i<dayNames.length; i++) {
        if (dayNames[i] === halfNameDay[0]) {
            var secondDayName = `${dayFullNames[i+1]}`;
            var thirdDayName = `${dayFullNames[i+2]}`;
            var fourthDayName = `${dayFullNames[i+3]}`;

            if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[1].weather.code > 799 && res.data[1].weather.code < 801) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[1].weather.code > 799 && res.data[1].weather.code < 801) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/night.svg" alt="">`;
            } else if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[1].weather.code > 800 && res.data[1].weather.code < 803) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/cloudy-day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[1].weather.code > 800 && res.data[1].weather.code < 803) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/cloudy-night.svg" alt="">`;
            } else if (res.data[1].weather.code > 199 && res.data[1].weather.code < 234) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/thunder.svg" alt="">`;
            } else if (res.data[1].weather.code > 299 && res.data[1].weather.code < 523) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/rainy.svg" alt="">`;
            } else if (res.data[1].weather.code > 599 && res.data[1].weather.code < 623) {
                daySecond.innerHTML = `${secondDayName} <img src="./images/snowy.svg" alt="">`;
            } else {
                daySecond.innerHTML = `${secondDayName} <img src="./images/cloudy.svg" alt="">`;
            }

            if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[2].weather.code > 799 && res.data[2].weather.code < 801) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[2].weather.code > 799 && res.data[2].weather.code < 801) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/night.svg" alt="">`;
            } else if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[2].weather.code > 800 && res.data[2].weather.code < 803) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/cloudy-day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[2].weather.code > 800 && res.data[2].weather.code < 803) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/cloudy-night.svg" alt="">`;
            } else if (res.data[2].weather.code > 199 && res.data[2].weather.code < 234) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/thunder.svg" alt="">`;
            } else if (res.data[2].weather.code > 299 && res.data[2].weather.code < 523) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/rainy.svg" alt="">`;
            } else if (res.data[2].weather.code > 599 && res.data[2].weather.code < 623) {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/snowy.svg" alt="">`;
            } else {
                dayThird.innerHTML = `${thirdDayName} <img src="./images/cloudy.svg" alt="">`;
            }

            if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[3].weather.code > 799 && res.data[3].weather.code < 801) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[3].weather.code > 799 && res.data[3].weather.code < 801) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/night.svg" alt="">`;
            } else if (halfDay[0].parseInt < 21 && halfDay[0].parseInt > 5 && res.data[3].weather.code > 800 && res.data[3].weather.code < 803) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/cloudy-day.svg" alt="">`;
            } else if (halfDay[0].parseInt > 21 && halfDay[0].parseInt < 5 && res.data[3].weather.code > 800 && res.data[3].weather.code < 803) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/cloudy-night.svg" alt="">`;
            } else if (res.data[3].weather.code > 199 && res.data[3].weather.code < 234) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/thunder.svg" alt="">`;
            } else if (res.data[3].weather.code > 299 && res.data[3].weather.code < 523) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/rainy.svg" alt="">`;
            } else if (res.data[3].weather.code > 599 && res.data[3].weather.code < 623) {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/snowy.svg" alt="">`;
            } else {
                dayFourth.innerHTML = `${fourthDayName} <img src="./images/cloudy.svg" alt="">`;
            }

            numberOfTemp1 = Math.round(res.data[1].temp);
            tempSecond.innerHTML = `${numberOfTemp1}<span>°</span>`;
            numberOfTemp2 = Math.round(res.data[2].temp);
            tempThird.innerHTML = `${numberOfTemp2}<span>°</span>`;
            numberOfTemp3 = Math.round(res.data[3].temp);
            tempFourth.innerHTML = `${numberOfTemp3}<span>°</span>`;
        }
    }
    
}

function convertForecastToF1() {
    if(celsium.classList.contains('active')) {
        a = Math.round((+numberOfTemp1 * 9) / 5 + 32);
        tempSecond.innerHTML = `${a}<span>°</span>`;
        numberOfTemp1 = a;
    }
}

function convertForecastToC1() {
    if(farenheit.classList.contains('active')) { 
        a = Math.round((+numberOfTemp1 - 32) * 5 / 9);
        tempSecond.innerHTML = `${a}<span>°</span>`;
        numberOfTemp1 = a;
    }
}

function convertForecastToF2() {
    if(celsium.classList.contains('active')) {
        a = Math.round((+numberOfTemp2 * 9) / 5 + 32);
        tempThird.innerHTML = `${a}<span>°</span>`;
        numberOfTemp2 = a;
    }
}

function convertForecastToC2() {
    if(farenheit.classList.contains('active')) { 
        a = Math.round((+numberOfTemp2 - 32) * 5 / 9);
        tempThird.innerHTML = `${a}<span>°</span>`;
        numberOfTemp2 = a;
    }
}

function convertForecastToF3() {
    if(celsium.classList.contains('active')) {
        a = Math.round((+numberOfTemp3 * 9) / 5 + 32);
        tempFourth.innerHTML = `${a}<span>°</span>`;
        numberOfTemp3 = a;
    }
}

function convertForecastToC3() {
    if(farenheit.classList.contains('active')) { 
        a = Math.round((+numberOfTemp3 - 32) * 5 / 9);
        tempFourth.innerHTML = `${a}<span>°</span>`;
        numberOfTemp3 = a;
    }
}

function convertToF() {
    if(celsium.classList.contains('active')) {
        a = Math.round((+numberOfTemp * 9) / 5 + 32);
        temperature.innerHTML = `${a}<span>°</span>`;
        numberOfTemp = a;
    }
}


function convertToC() {
    if(farenheit.classList.contains('active')) { 
        a = Math.round((+numberOfTemp - 32) * 5 / 9);
        temperature.innerHTML = `${a}<span>°</span>`;
        numberOfTemp = a;
    }
}



mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fuc3RhbnRzaW44MzgxIiwiYSI6ImNrYXpqbDc0bjBxdGkyd3FxZmE0MXdvaHkifQ.f5ZqURi7UARczHmPWUSWww';

const unsplashId = 'zpTGacauNJz2VKMgB4HLLOTLtXOpFgj-FbAbaBB6_fQ';
const weatherbitKey = '73a61a88747f47e5b5b26d3285f6a978';
const searchInput = document.getElementById('search');
const cityName = document.getElementById('city');
const temperature = document.getElementById('temperature');
const searchButton = document.querySelector('.search_button');
const refreshButton = document.querySelector('.refresh');
const farenheit = document.querySelector('.button_F');
const celsium = document.querySelector('.button_C');
const cityStatus = document.querySelector('.city-status');
const status = document.getElementById('status');
const dayTime = document.getElementById('day-time');
const feelsLike = document.querySelector('.feels-like');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const forecast = document.querySelector('.forecast');
const forecastSecond = document.getElementById('forecast02');
const forecastThird = document.getElementById('forecast03');
const forecastFourth = document.getElementById('forecast04');
const daySecond = document.querySelector('.day2');
const dayThird = document.querySelector('.day3');
const dayFourth = document.querySelector('.day4');
const tempSecond = document.querySelector('.temp2');
const tempThird = document.querySelector('.temp3');
const tempFourth = document.querySelector('.temp4');
const weatherImage = document.getElementById('image');


const map = new mapboxgl.Map({
    container: 'map',
    zoom: 10,
    style: 'mapbox://styles/mapbox/streets-v11'
});

navigator.geolocation.getCurrentPosition((position) => {
    map.flyTo({
        center: [position.coords.longitude, position.coords.latitude],
        essential: true
    });

    cityCurrentInfo();
    new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map);
    map.addControl(new mapboxgl.NavigationControl());
});



searchButton.onclick = () => {
    findCity();
    refresh();
}

refreshButton.onclick = () => {
    refresh();
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        findCity();
        refresh();
    }
})

farenheit.onclick = () => {
    convertForecastToF1();
    convertForecastToF2();
    convertForecastToF3();
    convertToF();
    farenheit.classList.add('active');
    celsium.classList.remove('active');
}

celsium.onclick = () => {
    convertForecastToC1();
    convertForecastToC2();
    convertForecastToC3();
    convertToC();
    celsium.classList.add('active');
    farenheit.classList.remove('active');
}

