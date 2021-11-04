
const mainContainerEl = document.querySelector("p>#main-container");

// let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
//         axios.get(queryURL)
//         .then(function(response){

// lansing 4998830
//#region Variables
const APIKey = "14a2bf498ec7475c9f365cf46a525533";
//const cityName = "lansing";
const lansingID = 4998830;
let cityName = "Lansing";
let  cityTemp = "0 F";
let cityWind = "0 MPH";
let cityHumidity = "0%";
let cityUV = "0.00";
weatherData = [];

const initialSetup = () => {
    console.log("in initial setup");




    // for debugging lets load the saved data to stop server spam
    let weatherData = loadSavedDataDEBUG();
    console.log(weatherData);
    // lets read the weatherData
   

}
const loadSavedDataDEBUG = () => {

    let weatherData = localStorage.getItem("weatherData");

    if (!weatherData) {
        weatherData = [];
        numOfTasks = 0;
    } else {
        // weatherData = JSON.parse(weatherData);
        // numOfTasks = weatherData.length;
        weatherData = JSON.parse(localStorage.getItem("weatherData"));
        readWeatherData(weatherData);
          
    }
        
    return weatherData;
    
};
const readWeatherData = (weatherData) => {
   // cityName = weatherData.current.name;
    cityTemp = weatherData.current.temp;
    cityWind = weatherData.current.wind_speed;
    cityHumidity = weatherData.current.humidity;
    cityUV = weatherData.current.uvi;
    
    console.log("cityName= " + cityName);
    console.log("cityTemp= " + cityTemp);
    console.log("cityWind= " + cityWind);
    console.log("cityHumidity= " + cityHumidity);
    console.log("cityUV= " + cityUV);

    updateCityWeatherUI(cityName, cityTemp, cityWind, cityHumidity, cityUV);


}
// use our data to update the whole UI
const updateCityWeatherUI  = (cityName, cityTemp, cityWind, cityHumidity, cityUV) => {


}

// Use api to get coordinates of city name
const getCoords = (city) => {

    // debugging
    cityName = "lansing";
  
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid="  + APIKey;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
               // displayRepos(data.items, language);
               coords = data;
               console.log(data);
               localStorage.setItem("coords", JSON.stringify(data));

               let lon = data.coord.lon;
               let lat = data.coord.lat;
               console.log("lat=" + lat + " lon= " + lon);


               // Use one Call API to get all the data we need
              
               getWeather(lon, lat);

            });
        } else {
            alert("Error:  Open Weather Failed");
        }
    });
};
// Use coordinates to get all the weather data needed.
const getWeather = (lon,lat) => {
   // let lon = lon;
   // let lat = lat;

    // using the one call api from openweathermap we can get everything we need.
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat  + "&lon=" + lon 
                 + "&units=imperial" + "&exclude=minutely,hourly,alerts"  + "&appid="  + APIKey;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
               // displayRepos(data.items, language);
               let weatherData = data;
               console.log(data);
               localStorage.setItem("weatherData", JSON.stringify(data));
               // get the lon and lat so I can call the one call api
                 
            });
        } else {
            alert("Error:  Open Weather Failed");
        }
    });


}

// Capture all button events
const buttonHandler = (event) => {
   // let buttonHandler = function(event) {
       // console.log("in button handler");
    console.log(event.target.id);

    if(event.target.id === "debug")
    {
        // This is where I will force a getCoords();
        console.log("in debug");
    }
};



//getCoords(cityName);
initialSetup();

// EventListenerd
document.addEventListener("click", buttonHandler);