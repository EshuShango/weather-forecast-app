//* A const var to store the OpenWeatherMap Application Program Interface: Key/ID 
const OWM_API_KEY = "508852d1991133deb312f4cf22a71a0b";

//* A const var to store the "Weather" for selected Cities
const LOCAL_STORAGE_KEY = "weather_history";

//! I used the geElById() method, because it's faster due to only 
//! needing to search through the DOM for a single element with a specific id

//* A const var to select the manipulate the search button
const searchBtn = document.getElementById("search-btn");

//* A const var to target the search box
const searchBox = document.getElementById("city-input");

//* A const var to target the history Element
const historyEl = document.getElementById("history");

//* A const var to target the weather data
const weatherDataEl = document.getElementById("weather-data");
//* A const var to target the load spinner
const loadSpinnerEl = document.getElementById("load-spinner");


//! let var because there will be mutable data passed through them
let currDTValue = "";

let history = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

for (const searchCity of history) {
  addHistoryLink(searchCity);
}

function addHistoryLink(cityname) {
  const newHistoryEl = document.createElement("button");

  newHistoryEl.classList.add("col-md-12", "btn", "btn-secondary");
  newHistoryEl.style = "margin-top: 10px;";
  newHistoryEl.textContent = cityname;

  newHistoryEl.addEventListener("click", () => {
    getWeatherData(cityname, false);
  });

  historyEl.prepend(newHistoryEl);
}

//* When user types in searchBox
//* Then somehow a fucntion appends the cityname var
//* Then when the searchBtn is pressed (event listenr is waiting for a click)
//!
//* Then the func gets the info from the API:

function getWeatherData(cityname, saveHistory) {
  const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=imperial&appid=${OWM_API_KEY}`;
  const forecastApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=imperial&appid=${OWM_API_KEY}`;

  let failed = false;
  fetch(forecastApiURL)
    .then((response) => {
      if (!response.ok) {
        failed = true;
      }
      return response.json();
    })
    .then((forecastData) => {
      fetch(weatherApiURL)
        .then((response) => {
          if (!response.ok) {
            failed = true;
          }
          return response.json();
        })
        .then((currWeatherData) => {
          //* process the data
          if (failed) {
            alert("Bad city name, try again");
          } else {
            searchBox.value = ""

            processWeatherData(currWeatherData, forecastData);

            if (saveHistory) {
              localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(history.concat(currWeatherData.name))
              );

              addHistoryLink(currWeatherData.name);
            }
          }
        });
    });
}

// currWeatherData = obj, forecastData = array of obj
function processWeatherData(currWeatherData, forecastData) {
  //add to history (if not first load)

  //* weather data
  let cityEl = document.querySelector(`#city`);
  cityEl.textContent = currWeatherData.name;

  let iconEl = document.querySelector(`#icon`);
  const iconId = currWeatherData.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconId}.png`;
  iconEl.src = iconUrl;

  const dateObj = dayjs.unix(currWeatherData.dt);

  let dateEl = document.querySelector(`#date`);
  //* the textContent takes the assigned var which is i....
  dateEl.textContent = dateObj.format("MMM D");

  let tempEl = document.querySelector(`#temp`);
  tempEl.textContent = currWeatherData.main.temp;

  let windEl = document.querySelector(`#wind`);
  windEl.textContent = currWeatherData.wind.speed;

  let humidEl = document.querySelector(`#humid`);
  humidEl.textContent = currWeatherData.main.humidity;

  //* forecast data
  // filter raw data to just 1 per day
  const filteredWeatherData = forecastData.list.filter((weatherobj) => {
    const dateObj = dayjs.unix(weatherobj.dt);
    const dateHour = dateObj.hour();

    //only for noon
    if (dateHour == 12) {
      return true;
    } else {
      return false;
    }
  });
  //*
  for (i = 0; i < 5; i++) {
    //* take the data on to the elements
    //* icon manipulate
    let iconEl = document.querySelector(`#icon-${i}`);
    const iconId = filteredWeatherData[i].weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconId}.png`;
    iconEl.src = iconUrl;

    const dateObj = dayjs.unix(filteredWeatherData[i].dt);

    let dateEl = document.querySelector(`#date-${i}`);
    //* the textContent takes the assigned var which is i....
    dateEl.textContent = dateObj.format("MMM D");

    let tempEl = document.querySelector(`#temp-${i}`);
    tempEl.textContent = filteredWeatherData[i].main.temp;

    let windEl = document.querySelector(`#wind-${i}`);
    windEl.textContent = filteredWeatherData[i].wind.speed;

    let humidEl = document.querySelector(`#humid-${i}`);
    humidEl.textContent = filteredWeatherData[i].main.humidity;
  }

  // all done loading!
  weatherDataEl.classList.remove("d-none");
  loadSpinnerEl.classList.add("d-none");

  //* Once the code gets here, we should have one weather object per day.
}

getWeatherData("Minneapolis",false);

searchBtn.addEventListener("click", () => {
  const cityName = searchBox.value;
  getWeatherData(cityName,true);
});

/*

  //* Here's an example of a data record you get back for the 5-Day Forecast

  {
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
    {
      "dt": 1661871600,
      "main": {
        "temp": 296.76,
        "feels_like": 296.98,
        "temp_min": 296.76,
        "temp_max": 297.87,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 933,
        "humidity": 69,
        "temp_kf": -1.11
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 0.62,
        "deg": 349,
        "gust": 1.18
      },
      "visibility": 10000,
      "pop": 0.32,
      "rain": {
        "3h": 0.26
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-08-30 15:00:00"
    },
    {
      "dt": 1661882400,
      "main": {
        "temp": 295.45,
        "feels_like": 295.59,
        "temp_min": 292.84,
        "temp_max": 295.45,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 931,
        "humidity": 71,
        "temp_kf": 2.61
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 96
      },
      "wind": {
        "speed": 1.97,
        "deg": 157,
        "gust": 3.39
      },
      "visibility": 10000,
      "pop": 0.33,
      "rain": {
        "3h": 0.57
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2022-08-30 18:00:00"
    },
    {
      "dt": 1661893200,
      "main": {
        "temp": 292.46,
        "feels_like": 292.54,
        "temp_min": 290.31,
        "temp_max": 292.46,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 931,
        "humidity": 80,
        "temp_kf": 2.15
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 68
      },
      "wind": {
        "speed": 2.66,
        "deg": 210,
        "gust": 3.58
      },
      "visibility": 10000,
      "pop": 0.7,
      "rain": {
        "3h": 0.49
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2022-08-30 21:00:00"
    },
    ....
    {
      "dt": 1662292800,
      "main": {
        "temp": 294.93,
        "feels_like": 294.83,
        "temp_min": 294.93,
        "temp_max": 294.93,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 935,
        "humidity": 64,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 88
      },
      "wind": {
        "speed": 1.14,
        "deg": 17,
        "gust": 1.57
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-09-04 12:00:00"
    }
  ],
  "city": {
    "id": 3163858,
    "name": "Zocca",
    "coord": {
      "lat": 44.34,
      "lon": 10.99
    },
    "country": "IT",
    "population": 4593,
    "timezone": 7200,
    "sunrise": 1661834187,
    "sunset": 1661882248
  }
}

*/

/*

//* Working with complex data types is a key ingredient to being a solid coder. 
//* Here are some activities to help you. Some of these activities can be done in a single line of code,
//* others maybe not. First and foremost the goal is to solve the problem. 
//* Then you can try and refactor if you want to.





// !
//* Given this array of objects:

const arrOfObjs = [
  { id: 1, name: "Mary", age: 35, occupation: "Engineer", salary: 120000, location: "Seattle" },
  { id: 2, name: "Jack", age: 30, occupation: "Salesperson", salary: 70000, location: "Cleveland" },
  { id: 3, name: "Dan", age: 28, occupation: "Store Owner", salary: 135000, location: "Dallas" },
  { id: 4, name: "Rachel", age: 40, occupation: "VP", salary: 220000, location: "Nashville" },
  { id: 5, name: "Emmet", age: 44, occupation: "Electrician", salary: 108000, location: "Pensacola" },
  { id: 6, name: "Diane", age: 32, occupation: "Teacher", salary: 88000, location: "Phoenix" }
];

TODO:

//* 1. Console.log Rachel's location, when all you know is the name of the array of Objects and that Rachel's is the fourth record in the array. (You're not using any array methods here, just navigating through the structure.)

//* 2. WITHOUT using a for-loop, or a .forEach() method, age every person by one year.

//* 3. Find the person with the highest salary and console.log their name.

//* 4. Filter the array so that only those making more than 115,000 are included

*/
