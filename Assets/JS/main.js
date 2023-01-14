let currDTValue = "";
const fiveDaysOfWeather = []


//* Here's a sample of how you might start the app
function getWeatherData(){
  fetch(apiUrl)
  .then( response => {
    return response.json()
  })
  .then( data => {
    //* send the data to the parsing function below
    parseWeatherData(data)
  })
}


function parseWeatherData(data){
  data.forEach( obj => {
    //* use moment or dayjs to parse the obj dt variable and get the "real date"
    const dateObj = new moment(obj.list.dt)

    //* from this dateObj, use moment or js to get the date it represents. ***This is for you to do ***.
    const currday = ""; 

    //* if the current dt value differs from the global variable, AND we don't have data in our array for this day, 
    //* we must be on a new day
    if( currDay !== currDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find( day => day.dt === obj.dt ) ){
      currDTValue = currDay // update the global variable so we don't use this day again

      //* if JS is still in this function, then we must be encountering this dt object for the first time. So the obj variable used in the forEach() must be referring to the firt hour block for this day. get the first record (the obj variable above) and use that for the weather for this day
      fiveDaysOfWeather.push(obj)
    }
  })

  //* Once the code gets here, we should have one weather object per day.
  console.log(fiveDaysOfWeather)
}


getWeatherData();



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

//* Working with complex data types is a key ingredient to being a solid coder. Here are some activities to help you. Some of these activities can be done in a single line of code, others maybe not. First and foremost the goal is to solve the problem. Then you can try and refactor if you want to.

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