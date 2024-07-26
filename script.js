
    
    const searchBox = document.querySelector(".search input");
    const searchButton = document.querySelector(".search button");
    const constianer=document.querySelector(".container");



searchButton.addEventListener("click", async function () {
            const location=searchBox.value;
            if(location==0){
                document.getElementById('city').focus();
            }
            else{
            const data=await handleAPI(location);
            if(data!=null){
                handleUpdates(data);
            }
            else{
                console.log("wrong input")
            }
            
        }

        searchBox.value="";
            
    
        })
        async function handleAPI(city){

            const apiKey = "60d4f10636b8d08430264d7ddb3869f7";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

    const responce = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (responce.status == 404) {
        // alert("City not found!");
        constianer.classList.add("show");
        let img = document.querySelector("#icon"); img.style.width = "30rem";
        document.querySelector(".detail").style.display = "none";
        document.querySelector(".temp2").style.display = "none";

        img.src = 'images/404.png';
        let temp = document.querySelector(".temp").innerHTML = "Error! 404";
        let name = document.querySelector(".name").innerHTML = "City Not Found"
        document.getElementById("temp").style.fontSize = "3rem";
        
        return null;
    }

    else if(responce.status == 200) {
        const jsonData = await responce.json();
        // console.log(jsonData);
        return(jsonData);
    }

        }

        async function handleUpdates(data){
            
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)/10 + "°c";
        document.querySelector(".name").innerHTML = data.name + ", " + data.sys.country;
        document.querySelector(".mintemp").innerHTML = Math.round(data.main.temp_min)/10 + "°c";
        document.querySelector(".maxtemp").innerHTML = Math.round(data.main.temp_max)/10 + "°c";


        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

        let img = document.querySelector("#icon");
     

        switch (data.weather[0].main) {
            case 'Clear':
                img.src = 'images/clear.png';
                break;

            case 'Rain':
                img.src = 'images/rain.png';
                break;

            case 'Snow':
                img.src = 'images/snow.png';
                break;

            case 'Clouds':
                img.src = 'images/cloud.png';
                break;

            case 'Mist':
                img.src = 'images/mist.png';
                break;

            case 'Haze':
                img.src = 'images/mist.png';
                break;

            default:
                img.src = 'images/cloud.png';
                break;
        }

        document.querySelector(".detail").style.display = "flex";
        document.querySelector(".temp2").style.display = "flex";
        document.getElementById("temp").style.fontSize = "5.2rem";
        img.style.width = "16rem";
   
        constianer.classList.add("show");
        }

      


