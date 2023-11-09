const apikey = "6db588c94e6f49b9ba792114bc4c26fb"; // api key.

const divyourLocation = document.getElementById('div-yourLocation');
const divcityLocation = document.getElementById('div-cityLocation');
const firstView = document.querySelector('.first-view');
const viewYourLocation = document.querySelector('.view-your-location');
const viewSearchCity = document.querySelector('.view-search-city');
const btnEnableLocation = document.getElementById('yourLocation');
const divUpperLeft = document.querySelector('.upper-left');
const divLowerLeft = document.querySelector('.lower-left');
const btnSearchCity = document.getElementById('btn_search');
const table_search_city = document.getElementById('table_search_city');
const table_your_location = document.getElementById('table_your_location');
const made_with_love = document.querySelector('.made-with-love');
const divLeftContent = document.querySelector('.left-content');



divyourLocation.addEventListener('click',yourLocationHandler);
function yourLocationHandler(){
    firstView.style.display = 'none';
    table_search_city.style.opacity = '0%';
    viewSearchCity.style.display = 'none';
    viewYourLocation.style.display = 'flex';
    divLeftContent.style.display = 'none';
    made_with_love.style.display = 'flex';
}

divcityLocation.addEventListener('click',cityLocationHandler);
function cityLocationHandler(){
    firstView.style.display = 'none';
    viewYourLocation.style.display = 'none';
    viewSearchCity.style.display = 'flex';
    divLeftContent.style.display = 'none';
    made_with_love.style.display = 'flex';
}

btnEnableLocation.addEventListener('click', async function(){
    navigator.geolocation.getCurrentPosition((position) => {fetchUsingLocation(position.coords.latitude,position.coords.longitude)},
    () => {console.log("error in getting location")});
});

async function fetchUsingLocation(lat,lon){
    try {
        let url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apikey+"";
        const response = await fetch(url);
        let data = await response.json();

        table_your_location.style.opacity = '100%';
        made_with_love.style.display = 'none';
        divLeftContent.style.display = 'flex';


        document.getElementById('humidity0').innerText = data.main.humidity+" %" ;
        document.getElementById('windSpeed0').innerText = data.wind.speed+" m/s" ;
        document.getElementById('visibility0').innerText = data.visibility+" m" ;
        document.getElementById('pressure0').innerText = Number(data.main.pressure)*100+" Pa" ;
        document.getElementById('country0').innerText = data.sys.country ;


        

        document.getElementById('paraTemp').innerText = (Number(data.main.temp)-273.15).toFixed(2)+"\xB0"+"C";
        document.getElementById('paraCity').innerText = data.name;
        document.getElementById('paraCountry').innerText = data.sys.country;
        document.getElementById('paraFeelsLike').innerText = main["weather"][0]["description"];

    } catch (error) {
        console.log("Got some Error "+error);
    }
}


// search using city
btnSearchCity.addEventListener('click',function(){
        city = document.querySelector("#searchCity").value;
        fetchUsingCity(city);
});

async function fetchUsingCity(city)
{
    try {
        let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"";
        const response = await fetch(url);
        let data = await response.json();


        table_search_city.style.opacity = '100%';
        made_with_love.style.display = 'none';
        divLeftContent.style.display = 'flex';

        document.getElementById('humidity1').innerText = data.main.humidity+" %" ;
        document.getElementById('windSpeed1').innerText = data.wind.speed+" m/s" ;
        document.getElementById('visibility1').innerText = data.visibility+" m" ;
        document.getElementById('pressure1').innerText = Number(data.main.pressure)*100+" Pa" ;
        document.getElementById('country1').innerText = data.sys.country ;
        
      
        document.getElementById('paraTemp').innerText = (Number(data.main.temp)-273.15).toFixed(2)+"\xB0"+"C";
        document.getElementById('paraCity').innerText = data.name;
        document.getElementById('paraCountry').innerText = data.sys.country;
        document.getElementById('paraFeelsLike').innerText = main["weather"][0]["description"];

        console.log(data.main.temp);

    } catch (error) {
        console.log("Got some Error "+error);
    }
}

