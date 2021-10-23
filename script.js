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
    console.log("searchSubmitted")
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=6eb8aa1a8a913c3b40a8fdee22427620')
        .then(response => response.json())
        .then(data => console.log(data));
}
function handleSearchHistory(e) {
    //tbd
}

search.addEventListener("click", handleSearch);
console.log("listenerForSearchButtonAdded")
list_group.addEventListener("click", handleSearchHistory);
console.log("listenerForListGroupAdded-1")
console.log("listenerForListGroupAdded-2")
console.log("listenerForListGroupAdded-3")
console.log("listenerForListGroupAdded-4")
console.log(Search)