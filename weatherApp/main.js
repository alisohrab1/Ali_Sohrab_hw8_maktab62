//*********************************************************************************filling the select***************************************************************************/

function fillSelect(name) {
  $("#select").append(
    `<option  id="${name}Select" value="${name}">${name}</option>       
        `
  );
}
//*********************************************************************************get requests***************************************************************************/
//request for filling the select
// $.ajaxSetup({ async: false });
$.get("https://restcountries.com/v3.1/all", function (data) {
  for (i in data) {
    // console.log(data[i].name.common)
    fillSelect(data[i].name.common);
  }
  console.log("done!");
});

//get selected countries data
function getCountryData(countryName) {
  $.get(`https://restcountries.com/v2/name/${countryName}`, function (data) {
    // console.log("hello");
    $("#cardName").html(`<p>${data[0].name}</p>`);
    $("#cardNative").append(`<span>${data[0].nativeName}</span>`);
    $("#cardRegion").append(`<span>${data[0].region}</span>`);
    $("#cardCapital").append(`<span>${data[0].capital}</span>`);
    getWeatherData(data[0].capital);
    $("#cardLang").append(
      `<span>${data[0].languages[0].name} : ${data[0].languages[0].nativeName} </span>`
    );
    $("#cardPopulation").append(`<span>${data[0].population}</span>`);
    $("#cardTz").append(`<span>${data[0].timezones[0]}</span>`);
    $("#cardImage").attr("src", `${data[0].flag}`);
    $("#cardCcode").html(`${data[0].callingCodes[0]}`);
    console.log(data[0].latlng);
    initMap(data[0].latlng[0],data[0].latlng[1]);
    // showMap();
    

    
  });
}

//get weather data
function getWeatherData(city) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=db8f6e4a84b10aa2339b3231ffd90c4a`,function(data){
    $("#weatherTemp").append(`<span>${data.main.temp}C</span>`)
    $("#weatherWind").append(`<span>${data.wind.speed}KM/H</span>`)
    $("#weatherHumid").append(`<span>${data.main.humidity}%</span>`)
    $("#weatherVis").append(`<span>${data.visibility}m</span>`)
    $("#weatherIcon").attr("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
    $("#weatherDescription").append(`<span>${data.weather[0].description}</span>`)
    
})
}
//*********************************************************************************get selected country***************************************************************************/
function getSelectedCountry() {
  let countryName = $("#select").val();
  //   clearCard();
  getCountryData(countryName);
}

function clearCard() {
  $("#cardName").html(``);
  $("#cardNative").html(``);
  $("#cardRegion").html(``);
  $("#cardCapital").html(``);
  $("#cardLang").html(``);
  $("#cardPopulation").html(``);
  $("#cardTz").html(``);
  $("#cardImage").attr("src", ``);
  $("#cardCcode").html(``);
  $("#weatherTemp").html(``);
  $("#weatherWind").html(``);
  $("#weatherHumid").html(``);
  $("#weatherVis").html(``);
  $("#weatherIcon").attr("src", ``)
  $("#weatherDescription").html(``);
  
}
///***************************************google maps*************************** */
function initMap(lat = 37.234332396 ,lng =  -115.80666344) {
 
    // The location of Uluru
    const uluru = { lat: lat, lng: lng };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
}

function showMap(){
  $("#map").removeClass("invisible");
}