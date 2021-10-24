'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=6eb8aa1a8a913c3b40a8fdee22427620'

let history = []; //empty array

let baseapiurl = "https://api.openweathermap.org"
let myApiKey = "6eb8aa1a8a913c3b40a8fdee22427620"
let search = document.getElementById("search-btn");
let input_search = document.querySelector("#input-search");
let current = document.querySelector("#current");
let five_day_forcast = document.querySelector("#five-day-forecast");
let list_group = document.querySelector("#list-group");



function handleSearch(e) {
    e.preventDefault()
    let city = input_search.value
    console.log("searchSubmitted")
    fetch(`${baseapiurl}/data/2.5/weather?q=${city}&units=imperial&appid=${myApiKey}`)
        .then(response => response.json())
        .then(data => {
            let lat = data.coord.lat
            let lon = data.coord.lon
            fetch(`${baseapiurl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=${myApiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                displayCurrentWeather(data.current);
                displayForecast(data.daily);
            });
        });
}
function handleSearchHistory(e) {
    //tbd
}

function displayCurrentWeather(data) {
    console.log("DISPLAY CURRENT WEATHER", data)
    let date = new Date(data.dt * 1000)
    let dateStr = date.toLocaleDateString("en-US")
    let temperature = data.temp
    let windSpeed = data.wind_speed
    let humidity = data.humidity
    let uv = data.uvi

    console.log(dateStr, temperature, windSpeed, humidity, uv)

    let container = document.getElementById("current")

    let dateElement = document.createElement("p")
    dateElement.innerHTML = dateStr

    let temperatureElement = document.createElement("p")
    temperatureElement.innerHTML = temperature + "F"

    container.appendChild(dateElement)
    container.appendChild(temperatureElement)
}

function displayForecast(data) {
    console.log("DISPLAY FORECAST", data)



    // let container = document.getElementById("")


    // let someIcon = document.createElement("img")
    // someIcon.setAttribute("src", "http://img.com/idk.jpg")

    // let someText = document.createElement("p")
    // someText.innerHTML = "hello"

    // container.appendChild(someIcon)
    // container.appendChild(someText)
}

search.addEventListener("click", handleSearch);
console.log("listenerForSearchButtonAdded")
list_group.addEventListener("click", handleSearchHistory);
console.log("listenerForListGroupAdded-1")
console.log("listenerForListGroupAdded-2")
console.log("listenerForListGroupAdded-3")
console.log("listenerForListGroupAdded-4")
console.log(Search)
