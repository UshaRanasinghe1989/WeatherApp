
const apiKey = "43dbb7d2bee14da6b8d193208242303";
const apiUrlForecast = "https://api.weatherapi.com/v1/forecast.json?"+ `key=${apiKey}` + `&days=4`;

let q;
let currentGeolocation;
let selectedTempUnit=document.getElementsByName("tempRadio");
let progressBar = document.getElementById("progressBar");
let weatherContent = document.getElementById("weatherContent");
let notificationAlert1 = document.getElementById("notificationAlert1");
let notificationAlert2 = document.getElementById("notificationAlert2");
let notificationContent = document.getElementById("notificationContent");

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
    getForcastWeather();
}


//GET WEATHER DATA
function getForcastWeather() {
    fetch(apiUrlForecast + "&q=" + q)
        .then((res) => res.json())
        .then((data) => {            
            progressBar.style.display = "none";
            weatherContent.style.display = "block";
            //notificationAlert.style.display="none";
            console.log(apiUrlForecast + "&q=" + q);
            console.log(data);
            let date = new Date(data.location.localtime);
            //let dateSuf = dateSuffixMethod(date.getDate());
            document.getElementById("currentConditionIcon").src = data.current.condition.icon;
            document.getElementById("currentConditionText").innerHTML = data.current.condition.text;
            if(data.current.condition.text=="Moderate or heavy rain with thunder"){
                notificationAlert1.insertAdjacentHTML('beforeend', 
                    '<div id="notificationAlert1" class="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert" style="width: 25%; z-index:30; float:right">'
                    +'<i class="fa-solid fa-circle-exclamation"></i>&nbsp;'
                    +'<div>'
                    +'<h6>Heavy rain alert !</h6>'
                    +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                    +'</div>'
                    +'</div><br><br><br><br><br>'
                );
            }

            document.getElementById("lastUpdated").innerHTML = data.current.last_updated;
            //document.getElementById("currentDay").innerHTML = days[date.getDay()];
            document.getElementById("currentDate").innerHTML = date.toDateString();
            document.getElementById("currentLocationTime").innerHTML = date.toTimeString().split("G")[0];
            document.getElementById("currentCountry").innerHTML = data.location.country;
            document.getElementById("currentRegion").innerHTML = data.location.region;
            document.getElementById("currentLocationName").innerHTML = data.location.name;

            for(i=0; i<selectedTempUnit.length; i++){
                if(selectedTempUnit[i].checked){
                    switch (selectedTempUnit[i].value){
                        case "celcius": 
                            document.getElementById("currentTemp").innerHTML = data.current.temp_c + "&#8451";
                        break; 
                        case "fahrenheit": 
                            document.getElementById("currentTemp").innerHTML = data.current.temp_f + "&#8457";
                        break; 
                    }
                }
            }

            if(data.current.temp_c>28){
                notificationAlert2.insertAdjacentHTML('beforeend', 
                    '<div id="notificationAlert2" class="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert" style="width: 25%; z-index:30; float:right">'
                    +'<i class="fa-solid fa-circle-exclamation"></i>&nbsp;'
                    +'<div>'
                    +'<h6>High temparature alert !</h6>'
                    +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                    +'</div>'
                    +'</div><br><br><br><br><br>'
                );
            }
            
            document.getElementById("currentUV").innerHTML = data.current.uv;

            for (let i = 1; i < data.forecast.forecastday.length; i++) {
                document.getElementById("futureDay"+i+"Date").innerHTML = new Date(data.forecast.forecastday[i].date).toDateString();                        
                document.getElementById("futureDay"+i+"Condition").innerHTML = data.forecast.forecastday[i].day.condition.text;
                document.getElementById("futureDay"+i+"CondIcon").src = data.forecast.forecastday[i].day.condition.icon;

                for(j=0; j<selectedTempUnit.length; j++){
                    if(selectedTempUnit[j].checked){
                        switch (selectedTempUnit[j].value){
                            case "celcius": 
                                document.getElementById("futureDay"+i+"MaxTemp").innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "&#8451";
                               
                            break; 
                            case "fahrenheit": 
                                document.getElementById("futureDay"+i+"MaxTemp").innerHTML = data.forecast.forecastday[i].day.maxtemp_f + "&#8457";
                                
                            break; 
                        }
                    }
                }
                
                document.getElementById("futureDay"+i+"UV").innerHTML = data.forecast.forecastday[i].day.uv;
                //notificationAlert.style.display="block";
            }
        })
    }
