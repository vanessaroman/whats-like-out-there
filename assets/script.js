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


    var cityValue = localStorage.getItem('cityInput', cityInput.value);

    document.getElementById('history').innerHTML += `
    
    <button type="button" class="btn btn-info" onclick="btnClick()">
    ${cityValue}
    </button>

    `
    
    ;

})




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
                <h3> Today </h3>
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${response.city.name}</h5>
                  <img src="http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@4x.png">
                        <ul>
                            <li>Date: ${response.list[0].dt_txt}</li>
                            <li>Temp: ${response.list[0].main.temp} F</li>
                            <li>Humidity: ${response.list[0].main.humidity}%</li>
                            <li>Wind Speed: ${response.list[0].wind.speed}</li>
                            <li>Uvi: ${oneCall.current.uvi}</li>
                        </ul>
                 
                </div>
              </div>
                
              `
            //   document.getElementById('history').innerHTML += `
            //     ${response.city.name} 
            //   `
            })
            
            
            // for loop to dynamically generate HTML cards 
            
        
            let fiveDays = []
            let dayOne = {
        
                icon: response.list[8].weather[0].icon,
                date: response.list[8].dt_txt,
                temp: response.list[8].main.temp,
                humidity: response.list[8].main.humidity,
                windSpeed: response.list[8].wind.speed,
            }
            let dayTwo = {
        
                icon: response.list[16].weather[0].icon,
                date: response.list[16].dt_txt,
                temp: response.list[16].main.temp,
                humidity: response.list[16].main.humidity,
                windSpeed: response.list[16].wind.speed,
            }
            let dayThree = {

                icon: response.list[24].weather[0].icon,
                date: response.list[24].dt_txt,
                temp: response.list[24].main.temp,
                humidity: response.list[24].main.humidity,
                windSpeed: response.list[24].wind.speed,

            }
            let dayFour = {

                icon: response.list[32].weather[0].icon,
                date: response.list[32].dt_txt,
                temp: response.list[32].main.temp,
                humidity: response.list[32].main.humidity,
                windSpeed: response.list[32].wind.speed,

            }
            let dayFive = {

                icon: response.list[39].weather[0].icon,
                date: response.list[39].dt_txt,
                temp: response.list[39].main.temp,
                humidity: response.list[39].main.humidity,
                windSpeed: response.list[39].wind.speed,

            }
           

            fiveDays.push(dayOne, dayTwo, dayThree, dayFour, dayFive)
            // console.log(fiveDays)

            fiveDays.forEach(day => {
                document.getElementById('futForecast').innerHTML += `
                
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <img src="http://openweathermap.org/img/wn/${day.icon}@4x.png">
                        <ul>
                            <li>Date: ${day.date}</li>
                            <li>Temp: ${day.temp} F</li>
                            <li>Humidity: ${day.humidity}%</li>
                            <li>Wind Speed: ${day.windSpeed}</li>
    
                        </ul>
                 
                </div>
                
                
                `
            });
        })
       


}; 








