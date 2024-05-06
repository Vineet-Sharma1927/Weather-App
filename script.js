const btn1 = document.getElementById("btn1");
const cityName = document.getElementById('cityName');

let APIKey = '08a6fcfb83c99d8c3f0463ea9a4948a1'

async function fetchData(city){
    cityName.value = '';
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
    let request = await res.json();
    if(request.message){
        document.querySelector(".second").innerHTML = `<h2>${city} ${request.message}</h2>`; 
    }
    // console.log(request);
    displayData(request);
}

async function fetchDataByCoordinates(lat,lon){
    try {
        
        let res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`)
        let request = await res.json();
        if(request.message){
            document.querySelector(".second").innerHTML = `<h2>${request.message}</h2>`; 
        }
        // console.log(request);
        displayData(request);
    } catch (error) {
        console.log(error.message)
    }
}

btn1.addEventListener("click",()=>{
    fetchData(cityName.value)

})

function displayData(data){
    div = `<h2>${data.main.temp} C</h2>
    <h2>${data.name}</h2>
    <div class="details">
        <div class="windspeed">
            <h3>Wind Speed</h3>
            <p>${data.wind.speed} m/s</p>
        </div>
        <div class="pressure">
            <h3>Pressure</h3>
            <p>${data.main.pressure} ma</p>
        </div>
        <div class="humidity">
            <h3>Humidity</h3>
            <p>${data.main.humidity} %</p>
        </div>
    </div>`
document.querySelector(".second").innerHTML = div;
}

document.getElementById("currloc").addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition((positon)=>{
        let lati = positon.coords.latitude;
        let longi = positon.coords.longitude;
        // console.log(lati,longi);
        fetchDataByCoordinates(lati,longi);
    })
})