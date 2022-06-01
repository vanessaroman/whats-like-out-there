const getCurrentLocation = document.querySelector('#current');
const searchCity = document.querySelector('#citysearch');
const cityInput = document.querySelector('#cityName');
//Get current browser location
getCurrentLocation.addEventListener('click', function(){
   if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(showPosition);
   } else { 
       document.getElementById("currentLoc").innerHTML="Geolocation is not supported by this browser, please search your city."}

    function showPosition(position) {
        document.getElementById("currentLoc").innerHTML = "Latitude: " + position.coords.latitude + "<br>" +
        "Longitude: " + position.coords.longitude;
    }
});

//Get city from input box when clicking search

searchCity.addEventListener('click', function(){
    console.log(cityInput.value)
    getWeather(cityInput.value)
})

//Global latitude and longitude for onecall api
console.log()
let lat
let lon

//function combining onecall api and city search api
var getWeather = function(cityName){
    
    console.log(lat && lon)
    let key = "5c526cf5f6c1a4cf2da59ee895524cff";
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`

    fetch(url)
        .then(function(response) {
            return response.json();
        }) .then(function(response) {
            console.log(response)
            lat = response.city.coord.lat
            lon = response.city.coord.lon

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`).then(function(response) {
                return response.json();
            }).then(oneCall => {
                console.log(oneCall)
                // for loop to dynamically generate HTML cards
            })

        })
}; 


