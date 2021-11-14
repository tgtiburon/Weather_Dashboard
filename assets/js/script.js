

const yekIPA = "14a2bf498ec7475c9f365cf46a525533";

// Variables
weatherData = [];
let savedCities = [];
let firstRun = true;



/*  Function: initialSetup()  
    => load initial data and sets up the UI based on what is there
    args: none
    return: none
*/

const initialSetup = () => {
    
    //load weatherdata to see if it's first time run
    loadWeatherData();

    if (firstRun === true) {
        //We need to supply the screen with dummy data
        // Get today's date using moment.js
        var todaysDate = moment().format("l");

        $("#cityName0").text("City Name   (" + todaysDate + ")");
        $("#weatherIcon0").attr("src", "http://openweathermap.org/img/w/01d.png");
        $("#cityTemp0").text("Temp: -- °F" );
        $("#cityHumidity0").text("Humidity: --%");
        $("#cityWind0").text("Wind: -- MPH");
        $("#cityUV0").text("0.00"); // need to make this a badge
        // Since we are just setting up a dummy screen we can set it to green
       $("#cityUV0").attr("class", " badge badge-pill badge-success");

       firstRun = false;
      
    } else {

        //If there is data update with that data.
        updateUI();

    }

}

/*  Function: loadsavedCitiesData()  
    => laads previous searches
    args: none
    return: savedCities object
*/
const loadSavedCitiesData = () => {

    let savedCities = localStorage.getItem("savedCities");

    if (!savedCities) {
      
       savedCities = [];
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
      
    } else {
      
        savedCities = JSON.parse(localStorage.getItem("savedCities"));
              
    }
        
    return savedCities;
}

/*  Function: loadWeatherData()  
    => loads the weather data form localStorage
    args: none
    return: returns the weatherData Object
*/
const loadWeatherData = () => {

    let weatherData = localStorage.getItem("weatherData");
    
    if (!weatherData) {
        weatherData = [];
        firstRun = true;
    
    } else {
      
        weatherData = JSON.parse(localStorage.getItem("weatherData"));
        firstRun = false;  
          
    }
        
    return weatherData;  
};

/*  Function: updateFiveDayUI()  
    => Updates the fiveday forecast
    args: weatherData Object
    return: none
*/

const updateFiveDayUI = (weatherData) =>  {
    // iterrate through 5 days
    if($(".card")) {
        // If the cards exist lets clear them 
        // and start over.
        $("#castHolder").empty();
    }
    //Loop through the five days and setup the cards
    for (let i = 1; i < 6; i++) {
 
        let objName1 = "";
        objName1 = $("<div>")
            .addClass("col-5 col-md-5 col-lg-2 card mb-5 bg-secondary");
           
        // use moment.js
       let tmpStr = moment().add(i, 'days').format("l");
    
        let objName2 = "";
       
        objName2 = $("<h4>")
            .addClass("font-weight-bold bg-secondary")
            .attr('id', 'cityDate'+ i)
            .text(tmpStr);
  
        tmpStr = weatherData.daily[i].weather[0].icon;
        let weathStr = "http://openweathermap.org/img/w/" + tmpStr + ".png"
         
        let objName3= "";
        objName3 = $("<img>")
            .addClass("font-weight-bold")
            .attr("id", "cityIcon" + i)
            .attr("src", weathStr);
           
        tmpStr = weatherData.daily[i].temp.max;
        let objName4= "";
        objName4 = $("<p>")
            .addClass("font-weight-bold")
            .attr('id', "cityTemp: " + i)
            .text("Temp: " + tmpStr + " °F");

        tmpStr = weatherData.daily[i].wind_speed;
        let objName5= "";
        objName5 = $("<p>")
                .addClass("font-weight-bold")
                .attr('id', "cityWind" + i)
                .text("Wind: " + i + " MPH");

        tmpStr = weatherData.daily[0].humidity;
        let objName6= "";
        objName6 = $("<p>")
                .addClass("font-weight-bold")
                .attr('id', "cityHumidity" + i)
                .text("Humidity: " + tmpStr + " %"  );

        $("#castHolder").append(objName1);
        objName1.append(objName2);
        objName1.append(objName3);
        objName1.append(objName4);
        objName1.append(objName5);
        objName1.append(objName6); 
        
    }
}



/*  Function: updateSavedCitiesUI()  
    => Updates the 8 buttons that save past searches
    args: saveedCities Object
    return: none
*/
const updateSavedCitiesUI = (savedCities) => {
    // iterate to load our saved cities
    // Clear the div to rebuild it.
    $("#city-holder").empty();

    for (let i = 0; i < savedCities.length; i++) {
   
        let objName = "";
        buttonStr = savedCities[i];

        // Use buttons to store cities.
        objName = $("<button>")
            .addClass("btn btn btn-secondary w-100 mb-3")
            .html(buttonStr)
            .attr("myIndex", i);
        $("#city-holder").append(objName);  
    }


}
/*  Function: updateCityWeatherUI()  
    => takes weatherData and updates the City weather
        part of the ui (upper right)
    args: weatherData object
    return: none
*/

// use our data to update the city weather UI
const updateCityWeatherUI  = (weatherData) => {

    // Get today's date using moment.js
    var todaysDate = moment().format("l");

    let savedCities = loadSavedCitiesData();
    cityName = savedCities[0];
    // pull the data we need from the weatherData object
    cityIcon = weatherData.current.weather[0].icon;
    $("#weatherIcon0").attr("src", "http://openweathermap.org/img/w/" + cityIcon + ".png");
    cityTemp = weatherData.current.temp;
    cityWind = weatherData.current.wind_speed;
    cityHumidity = weatherData.current.humidity;
    cityUV = weatherData.current.uvi;
    // set the attributes of the elements 
    $("#cityName0").text(cityName + "  (" + todaysDate + ")");
    $("#cityTemp0").text("Temp: " + cityTemp + " °F" );
    $("#cityHumidity0").text("Humidity: " + cityHumidity + "%");
    $("#cityWind0").text("Wind: "+ cityWind + " MPH");
    $("#cityUV0").text(cityUV); // need to make this a badge
    // properly color the UV Index badge
    if (cityUV <= 2.99) {
        // Green badge
        $("#cityUV0").attr("class", " badge badge-pill badge-success");
    } else if (cityUV >= 3.00  && cityUV <= 5.99) {
        // Yellow 
        $("#cityUV0").attr("class", " badge badge-pill badge-warning");

    }  else if (cityUV >= 6.00 ) {
        // Orange
        $("#cityUV0").attr("class", " badge badge-pill badge-danger");
    } 
}

/*  Function: updateUI()  
    => calls all the updateUI functions after
        loading the needed data.
    args: none
    return: none
*/
const updateUI = () => {

    // for debugging lets load the saved data to stop server spam
    let weatherData = loadWeatherData();
    let savedCities = loadSavedCitiesData();

   updateSavedCitiesUI(savedCities);
   updateCityWeatherUI(weatherData);
   updateFiveDayUI(weatherData);

}

/*  Function: getCoords()  
    => uses the api to get the lon and lat of the
        requested city
    args: city which stores the city the user searched
    return: none
*/


const getCoords = (city) => {
  
   cityName = city;
  // create the url we will send
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid="  + yekIPA;
    // use fetch to get the data.
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
               coords = data;
               localStorage.setItem("coords", JSON.stringify(data));

               let lon = data.coord.lon;
               let lat = data.coord.lat;
                // now that we have lon and lat call the one api
               getWeather(lon, lat);
            });
            // catch fetch errors
        } else {
            alert("Error:  Open Weather Failed! Check the spelling of your city name please!");
            // Update UI to show error button
            updateUI();
        }
    });
};

/*  Function: getWeather()  
    => calls the 5 day forecast from the api
    args: lon and lat of city being searched
    return: none
*/
// Use coordinates to get all the weather data needed.
const getWeather = (lon,lat) => {
   

    // using the one call api from openweathermap we can get everything we need.
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat  + "&lon=" + lon 
                 + "&units=imperial" + "&exclude=minutely,hourly,alerts"  + "&appid="  + yekIPA;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
    
               localStorage.setItem("weatherData", JSON.stringify(data));
                // now that we have all the data, update the ui
              updateUI();
                 
            });
            //catch errors
        } else {
            alert("Error:  Open Weather Failed");
        }
    });

   


}

/*  Function: .btn-secondary clicked  
    => saved city  button clicked.
    args: none
    return: none
*/
$("#city-holder").on("click", ".btn-secondary", function() {
    savedCities = loadSavedCitiesData();
    // figure out which saved city button was clicked
    let index = $(this).attr("myIndex");
    // get the name of the city on that button
    let searchCity = savedCities[index];
    // Moves the specific element to the front and pushes everything else
    // down one spot.
    savedCities.forEach(function(item, i) {
        if(item === searchCity) {
            savedCities.splice(i,1);
            savedCities.unshift(item);
        }
    });

    localStorage.setItem("savedCities", JSON.stringify(savedCities));
    // get the coordinates of the called city
    getCoords(searchCity);
    updateUI();

});

/*  Function: #srchBtn clicked  
    => search  button clicked.
    args: none
    return: none
*/
$("#search-holder").on("click", "#srchBtn", function() {
    // store the user input
    searchCity = $("#srchInput").val(); 
    searchCity = searchCity.toUpperCase();
    // clear data
    $("#srchInput").val("");
    // if they input no cityname 
    if(searchCity == "") {
        // make the Enter City Name Flash
        $("#srchInput").stop(true, true).animate({opacity: 0.1}, 100).delay(100).animate({opacity: 1}, 100)
            .animate({opacity: 0.1}, 100).delay(100).animate({opacity: 1}, 100);
        return;
     }
     // load the savedCities object so we can add our new city if needed
     savedCities = loadSavedCitiesData();
   
     // lets see if they entered a city that has a button already
     // use a bool to see if its a dupe
     let isDupe = false;
     for (let i = 0; i < savedCities.length; i++) {
         const element = savedCities[i];
         if(savedCities[i]=== searchCity) {

            // We already have a button for this.
            // move it to the top and click it
            savedCities.forEach(function(item, i) {
                if(item === searchCity) {
                    savedCities.splice(i,1);
                    savedCities.unshift(item);
                    isDupe = true;
                }
            });
         }   
     } 
     
     // add the new city to the top of the array
     //
     //
     // DEBUG I MAY WANT TO CHECK AND SEE IF THEY ARE ALREADY ON THE ARRAY
     if(isDupe === true) {
         // if it is a dupe we already took care of it 
         // above

     }else { 
         // if it is not a dupe then remove the oldest city
         // and add the new city to the bottom
        savedCities.unshift(searchCity);
        if(savedCities.length > 8) {
            // pop the last one off the array
            savedCities.pop();
     
        };
     }
  
     localStorage.setItem("savedCities", JSON.stringify(savedCities));
     
     getCoords(searchCity);

});


/*  Function: enter key 
    => hit to submit simulate srchBtn clicked  
    args: none
    return: none
*/
$("#srchInput").keypress(function(e) {
    if (event.which === 13) {
        console.log("enter hit");
        $("#srchBtn").trigger("click");
        return false;
    }
});

//Start the program
initialSetup();

