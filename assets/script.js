const getCurrentLocation = document.querySelector('#current');
const searchCity = document.querySelector('#citysearch');
const cityInput = document.querySelector('#cityName');
const locationName = document.querySelector('#locName');
// const cityHistory = document.querySelector('#history')


//Get city from input box when clicking search

searchCity.addEventListener('click', function(){
    // console.log(cityInput.value)
    getWeather(cityInput.value);
    // event adding search history to local storage
    localStorage.setItem('cityInput', cityInput.value);

})

// Adding search input to div
function getCity (){
    var cityValue = localStorage.getItem('cityInput');
    if (cityValue) {
    document.getElementById('history').value = cityValue;
    };
}



//Global latitude and longitude for onecall api
console.log()
let lat
let lon

//function combining onecall api and city search api
var getWeather = function(cityName){
    
    // console.log(lat && lon)
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
            }).then(oneCall=> {
                console.log(oneCall)
                document.getElementById('currentCity').innerHTML = `

                <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${response.city.name}</h5>
                  <p class="card-text">Here's your weather!</p>
                  <img src="http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@4x.png">
                        <ul>
                            <li>Date: ${response.list[0].dt_txt}</li>
                            <li>Temp: ${response.list[0].main.temp}</li>
                            <li>Humidity: ${response.list[0].main.humidity}</li>
                            <li>Wind Speed: ${response.list[0].wind.speed}</li>
                            <li>Uvi: ${oneCall.current.uvi}</li>
                        </ul>
                 
                </div>
              </div>
                
              `
                // for loop to dynamically generate HTML cards 
            })

        })
        //Show data on main area of page

//    console.log(document.getElementById("locName").innerHTML = response.city.name)
    
}; 








