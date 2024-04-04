const apiKey = "43dbb7d2bee14da6b8d193208242303";
let q;
let currentGeolocation;
let selectedTempUnit=document.getElementsByName("tempRadio");
const startDate=new Date(new Date().getTime()-7*24*60*60*1000).toISOString().split('T')[0];
const endDate=new Date(new Date().getTime()-1*24*60*60*1000).toISOString().split('T')[0];
const apiUrlHistory = "https://api.weatherapi.com/v1/history.json?" + `&key=${apiKey}` + `&end_dt=` + endDate + `&dt=` + startDate;
let weatherContent = document.getElementById("weatherContent");

weatherContent.style.display = "none";
getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    currentGeolocation = position.coords.latitude + "," + position.coords.longitude;
    q = currentGeolocation;
    console.log(q);
    getHistoryWeather();
}

//HISTORY WEATHER
function getHistoryWeather() {
    fetch(apiUrlHistory + "&q=" + q)
        .then((res) => res.json())
        .then((data) => {
            progressBar.style.display = "none";
            weatherContent.style.display = "block";
            console.log(apiUrlHistory + "&q=" + q);
            console.log(data);
            let date = new Date(data.location.localtime);
            
            for (let i = 0; i < data.forecast.forecastday.length; i++) {
                document.getElementById("historyDay"+i+"Date").innerHTML = new Date(data.forecast.forecastday[i].date).toDateString();                        
                document.getElementById("historyDay"+i+"Condition").innerHTML = data.forecast.forecastday[i].day.condition.text;
                document.getElementById("historyDay"+i+"CondIcon").src = data.forecast.forecastday[i].day.condition.icon;

                for(j=0; j<selectedTempUnit.length; j++){
                    if(selectedTempUnit[j].checked){
                        switch (selectedTempUnit[j].value){
                            case "celcius": 
                                document.getElementById("historyDay"+i+"MaxTemp").innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "&#8451";
                            break; 
                            case "fahrenheit": 
                                document.getElementById("historyDay"+i+"MaxTemp").innerHTML = data.forecast.forecastday[i].day.maxtemp_f + "&#8457";
                                
                            break; 
                        }
                    }
                }

                
                document.getElementById("historyDay"+i+"UV").innerHTML = data.forecast.forecastday[i].day.uv;
            }
        })
}
