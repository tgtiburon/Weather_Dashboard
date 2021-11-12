
const mainContainerEl = document.querySelector("p>#main-container");


const yekIPA = "14a2bf498ec7475c9f365cf46a525533";


let cityName = "City Name"
let  cityTemp = "0 F";
let cityWind = "0 MPH";
let cityHumidity = "0%";
let cityUV = "0.00";
weatherData = [];
let savedCities = [];
let firstRun = true;


// DEBUG STUFF



const initialSetup = () => {
    
    console.log("in initial setup");
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
const loadSavedCitiesData = () => {

    let savedCities = localStorage.getItem("savedCities");

    if (!savedCities) {
       // savedCities = [];
       //debugging;
       savedCities = [
       // "DETROIT", 
       // "MIAMI", 
       // "DAYTON",
       // "DALLAS",
       // "MEMPHIS",
       // "ATLANTA",
       // "CHICAGO"
    
    ];
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
      
    } else {
      
        savedCities = JSON.parse(localStorage.getItem("savedCities"));
        
        
    }
        
    return savedCities;
}

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



const updateFiveDayUI = (weatherData) =>  {
    // iterrate through 5 days
    if($(".card")) {

        // If the cards exist lets clear them.
        $("#castHolder").empty();
    }

    for (let i = 0; i < 5.; i++) {
 
   
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
       // console.log(tmpStr);
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




const updateSavedCitiesUI = (savedCities) => {
    // iterate to load our saved cities
  

    $("#city-holder").empty();

    if(savedCities.length > 8) {

      
        // we need to shorten it.
    }
    for (let i = 0; i < savedCities.length; i++) {
   
        let objName = "";
        buttonStr = savedCities[i];

        objName = $("<button>")
            .addClass("btn btn btn-secondary w-100 mb-3")
            .html(buttonStr)
            .attr("myIndex", i);

           // $(objName3).attr("myindex" , i);
        $("#city-holder").append(objName);  
    }


}


// use our data to update the whole UI
const updateCityWeatherUI  = (weatherData) => {

 
   
    // Get today's date using moment.js
    var todaysDate = moment().format("l");

    let savedCities = loadSavedCitiesData();
    cityName = savedCities[0];
    
    cityIcon = weatherData.current.weather[0].icon;
    $("#weatherIcon0").attr("src", "http://openweathermap.org/img/w/" + cityIcon + ".png");
    cityTemp = weatherData.current.temp;
    cityWind = weatherData.current.wind_speed;
    cityHumidity = weatherData.current.humidity;
    cityUV = weatherData.current.uvi;

 

    $("#cityName0").text(cityName + "  (" + todaysDate + ")");
    $("#cityTemp0").text("Temp: " + cityTemp + " °F" );
    $("#cityHumidity0").text("Humidity: " + cityHumidity + "%");
    $("#cityWind0").text("Wind: "+ cityWind + " MPH");
    $("#cityUV0").text(cityUV); // need to make this a badge
  
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
const updateUI = () => {

    // for debugging lets load the saved data to stop server spam
    let weatherData = loadWeatherData();
    let savedCities = loadSavedCitiesData();

   updateSavedCitiesUI(savedCities);
   updateCityWeatherUI(weatherData);
   updateFiveDayUI(weatherData);

}
// Use api to get coordinates of city name
const getCoords = (city) => {
  

   // debugging
   cityName = city;
  
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid="  + yekIPA;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
               // displayRepos(data.items, language);
               coords = data;
              // console.log(data);
               localStorage.setItem("coords", JSON.stringify(data));

               let lon = data.coord.lon;
               let lat = data.coord.lat;
              // console.log("lat=" + lat + " lon= " + lon);


               // Use one Call API to get all the data we need
               
              console.log ("in getcoords");
               getWeather(lon, lat);

            });
        } else {
            alert("Error:  Open Weather Failed");
        }
    });
};
// Use coordinates to get all the weather data needed.
const getWeather = (lon,lat) => {
   

    // using the one call api from openweathermap we can get everything we need.
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat  + "&lon=" + lon 
                 + "&units=imperial" + "&exclude=minutely,hourly,alerts"  + "&appid="  + yekIPA;

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
              
               // displayRepos(data.items, language);
               let weatherData = data;
               console.log("in getWeather()");
               localStorage.setItem("weatherData", JSON.stringify(data));
               // get the lon and lat so I can call the one call api

              updateUI();
                 
            });
        } else {
            alert("Error:  Open Weather Failed");
        }
    });

   


}
$("#city-holder").on("click", ".btn-secondary", function() {
    savedCities = loadSavedCitiesData();

    console.log(this);
    let index = $(this).attr("myIndex");
    
    let searchCity = savedCities[index];

    // Moves the specific element to the front and pushes everything else
    // down one spot.

    savedCities.forEach(function(item, i) {
        if(item === searchCity) {
            savedCities.splice(i,1);
            savedCities.unshift(item);

        }
    });
    console.log(savedCities);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
        
    console.log(searchCity);
    getCoords(searchCity);
    updateUI();

});


$("#search-holder").on("click", "#srchBtn", function() {

    console.log("in click");
    searchCity = $("#srchInput").val(); 
    searchCity = searchCity.toUpperCase();
    $("#srchInput").val("");
 
    if(searchCity == "") {


        
       // alert("You did not enter a city.");
       // $("#srchInput").css("font-weight", "Bold");
     //   $("#srchInput").effect("pulsate", {times:3}, 2000);
        //$("#srchInput").stop().css("background-color", "#FFFF9C").animate({ backgroundColor : "#FFFFFF"}, 1500);
       // $("#srchInput").val().effect("highlight", {}, 3000);
        $("#srchInput").stop(true, true).animate({opacity: 0.1}, 100).delay(100).animate({opacity: 1}, 100)
            .animate({opacity: 0.1}, 100).delay(100).animate({opacity: 1}, 100);
        return;
     }

     savedCities = loadSavedCitiesData();
   
     // lets see if they entered a city that has a button already
     // 

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


     }else { 
        savedCities.unshift(searchCity);
        if(savedCities.length > 8) {
            // pop the last one off the array
            savedCities.pop();
     
        };
     }
  
     localStorage.setItem("savedCities", JSON.stringify(savedCities));
 
     getCoords(searchCity);

});

// Capture all button events
//const buttonHandler = (event) => {


    // if(event.target.id === "srchBtn") {
        

    //    searchCity = $("#srchInput").val(); 
    //    searchCity = searchCity.toUpperCase();
    //    $("#srchInput").val("");
    
    //    if(searchCity == "") {
    //        alert("You did not enter a city.");
    //        return;
    //     }
      
    //      savedCities = loadSavedCitiesData();
    //     // add the new city to the top of the array
    //     //
    //     //
    //     // DEBUG I MAY WANT TO CHECK AND SEE IF THEY ARE ALREADY ON THE ARRAY
    //     savedCities.unshift(searchCity);
    //     if(savedCities.length > 8) {
    //         // pop the last one off the array
    //         savedCities.pop();
        
    //     };
     
    //     localStorage.setItem("savedCities", JSON.stringify(savedCities));
    
    //     getCoords(searchCity);
     
    // }
//};



initialSetup();


// EventListenerd
//document.addEventListener("click", buttonHandler);