function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);

  // let city = searchInput.value[0].toUpperCase()
  // console.log(city)

  // let cityElement = document.querySelector("#weatherCity");
  // cityElement.innerHTML = city + searchInput.value.slice(1);
  searchCity(searchInput.value)
}

let searchFormElement = document.querySelector("#search-form");
console.log(searchFormElement);

searchFormElement.addEventListener("submit", handleSearchSubmit);


function searchCity(city){
  let apiKey='a03e62525c5f6b05f4bt9c6f57oe33ff'
  let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`
  console.log(apiUrl)
 
  axios.get(apiUrl).then(refreshWeather);
 
 }
 

function refreshWeather(response){

  let cityTempElement = document.querySelector('#cityTemp')
  let cityElement = document.querySelector("#weatherCity");
  let descriptionElement = document.querySelector('#description')
  let humidityElement = document.querySelector('#humidity')
  let windSpeedElement = document.querySelector('#wind-speed')
  let timeElement = document.querySelector('#time')
  let iconElement = document.querySelector('#icon')


  iconElement.innerHTML = `<img class="weather-icon"  src="${response.data.condition.icon_url}" alt="">
`
  cityTempElement.innerHTML = Math.round(response.data.temperature.current)
  cityElement.innerHTML = response.data.city

  descriptionElement.innerHTML = response.data.condition.description

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`

  windSpeedElement.innerHTML = `${response.data.wind.speed} mph`

  let date = new Date(response.data.time * 1000)
  timeElement.innerHTML = formatDate(date)
// timeElement.innerHTML = `${date.getDay()}${date.getHours()}:${date.getMinutes()}` 

console.log(response.data.temperature.current)

getForeCast(response.data.city)

}

function formatDate(date){
  let minutes = date.getMinutes();
  let hours= date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes},`

}


function getForeCast(city){
 let apiKey = 'a03e62525c5f6b05f4bt9c6f57oe33ff'
 let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`
 console.log(apiUrl)

 axios.get(apiUrl).then(displayForeCast);

}


function displayForeCast(response){
  console.log(response.data)

  let forecastHtml = ''

  response.data.daily.forEach(function(day, index){
    if(index < 5){

    forecastHtml += `
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <img class="weather-forecast-icon"src="${day.condition.icon_url}"/>
      <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}</strong>
        </div>
        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}</div>
      </div>
    
    </div>`
    }
  })

  let foreCastElement = document.querySelector('#forecast')
  foreCastElement.innerHTML = forecastHtml

}

function formatDay(timeStamp){
  let date = new Date(timeStamp * 1000);

  let days = ["Sun", "Mon", "Tues", "Weds", "Thur", "Fri","Sat"]

  return days[date.getDay()]
}



searchCity("atlanta")

displayForeCast()

