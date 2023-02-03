var city="";
// variable declaration
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");
var currentUvindex= $("#uv-index");
var sCity=[];
// searches the city 
function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}
// API key
var APIKey="cf6252a1b37109cb680219e894b9393d";
// Display the curent and future weather 
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}
function currentWeather(city){
    //URL get a data from server side.
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
 
        console.log(response);
        
        var weathericon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
      
        var date=new Date(response.dt*1000).toLocaleDateString();
        //name of city and concanatig the date and icon.
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
        //display the current temperature.
       
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2)+"&#8457");
        // Display the Humidity
        $(currentHumidty).html(response.main.humidity+"%");
        //Display Wind speed and convert to MPH
        var ws=response.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);
        $(currentWSpeed).html(windsmph+"MPH");
        // Display UVIndex.
       
        UVIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
            sCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (sCity==null){
                sCity=[];
                sCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }
    });
}
    
