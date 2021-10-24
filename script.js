const baseapiurl = "https://api.openweathermap.org"
const myApiKey = "6eb8aa1a8a913c3b40a8fdee22427620"
let search = document.getElementById("search-btn");
let input_search = document.querySelector("#input-search");


function searchClicked(e) {
    e.preventDefault()
    let city = input_search.value
    addSearchHistory(city)
    console.log("searchSubmitted")
    performSearch(city)
}


function performSearch(city) {
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


function addSearchHistory(value) {
    var history = JSON.parse(localStorage.getItem("weatherHistory"));
    if (!history) {
        history = []
    }

    history.push(value);
    localStorage.setItem("weatherHistory", JSON.stringify(history));
    loadSearchHistory()
}


function loadSearchHistory() {
    let searchHistory = document.getElementById("search-history")
    searchHistory.innerHTML = ""

    var history = JSON.parse(localStorage.getItem("weatherHistory"))
    for (var i = 0; i < history.length; i++) {
        let city = history[i]

        let row = document.createElement("div")
        row.classList = "row mx-auto mt-2"

        let button = document.createElement("button");
        button.type = "button"
        button.classList = "btn btn-secondary"
        button.innerHTML = history[i]

        button.onclick = function() {
            console.log(city)
            input_search.value = city
            performSearch(city)
        }

        row.appendChild(button)
        searchHistory.appendChild(row)
    }
}


function displayCurrentWeather(data) {
    console.log("DISPLAY CURRENT WEATHER", data)
    let date = new Date(data.dt * 1000)
    let dateStr = date.toLocaleDateString("en-US")

    let titleText = document.getElementById("current-title");
    titleText.innerHTML = `${input_search.value} (${dateStr})`

    let iconImg = document.getElementById("current-icon");
    iconImg.setAttribute("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)

    let tempText = document.getElementById("current-temp");
    tempText.innerHTML = `Temp: ${data.temp}°F`

    let windText = document.getElementById("current-wind");
    windText.innerHTML = `Wind: ${data.wind_speed} mph`

    let humidityText = document.getElementById("current-humidity");
    humidityText.innerHTML = `Humidity: ${data.humidity}%`

    let uviText = document.getElementById("current-uvi");
    uviText.innerHTML = `UV Index: `

    uviColor = "bg-success"
    if (data.uvi >= 3) {
        uviColor = "bg-warning"
    }
    if (data.uvi >= 6) {
        uviColor = "bg-danger"
    }

    let uviBadge = document.createElement("span")
    uviBadge.classList = `badge rounded-pill ${uviColor}`
    uviBadge.innerHTML = data.uvi
    uviText.appendChild(uviBadge)
}


function displayForecast(data) {
    console.log("DISPLAY FORECAST", data)

    let forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = ""

    for (let i = 1; i <= 5; i++) {
        let card = document.createElement("div");
        card.classList = "card text-white bg-dark mb-3 me-2";
        card.style = "max-width: 12rem;"

        let date = new Date(data[i].dt * 1000)
        let dateStr = date.toLocaleDateString("en-US")

        let cardHeader = document.createElement("div")
        cardHeader.classList = "card-header"
        cardHeader.innerHTML = dateStr

        let cardBody = document.createElement("div")
        cardBody.classList = "card-body"

        let iconImg = document.createElement("img")
        iconImg.setAttribute("src", `http://openweathermap.org/img/w/${data[i].weather[0].icon}.png`)
        cardBody.appendChild(iconImg)

        let tempText = document.createElement("p")
        tempText.classList = "card-text"
        tempText.innerHTML = `Temp: ${data[i].temp.day}°F`
        cardBody.appendChild(tempText)

        let windText = document.createElement("p")
        windText.classList = "card-text"
        windText.innerHTML = `Wind: ${data[i].wind_speed} mph`
        cardBody.appendChild(windText)

        let humidityText = document.createElement("p")
        humidityText.classList = "card-text"
        humidityText.innerHTML = `Humidity: ${data[i].humidity}%`
        cardBody.appendChild(humidityText)

        card.appendChild(cardHeader)
        card.appendChild(cardBody)

        forecastContainer.appendChild(card)
    }
}


search.addEventListener("click", searchClicked);
console.log("listenerForSearchButtonAdded")

loadSearchHistory()
