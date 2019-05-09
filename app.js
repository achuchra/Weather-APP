//read what's inside search bar
let formLocation = document.getElementById("location");

//run function on submit
formLocation.addEventListener("submit", geocode);

//Let's get some API response...
function geocode(e) {
  e.preventDefault();

  let pending = true;
  let fulfilled = false;
  let rejected = false;

  var location = document.getElementById("form_location").value;

  if (pending) {
    document.getElementById("form_location").style.borderColor =
      "rgba(255, 255, 255, 0.5)";

    document.getElementById("main").id = "loading";
  }

  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: "AIzaSyDHW9n1b3HJf13N-W_CRcJB1YRfRPzDps0"
      }
    })
    .then(function(response) {
      console.log(response);
      pending = false;
      fulfilled = true;
      if (fulfilled) {
        let main2 = (document.getElementById("loading").id = "main");
        document.getElementById("word").style.opacity = "1";
        document.getElementById("word2").style.opacity = "1";
        document.getElementById("word3").style.opacity = "1";
        if (document.getElementById("mainHTML")) {
          document.getElementById("mainHTML").id = "mainHTML_loaded";
        }
      }
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      return axios.get(
        `${proxy}https://api.darksky.net/forecast/04ffe3c8e0cdd04db48a3b60e1050492/${lat},${lng}`
      );
    })
    .then(function(response) {
      console.log(response);
      //set Temperatures
      let temp = response.data.currently.temperature;
      let summ = response.data.currently.summary;
      document.getElementById("temperature-today").innerHTML =
        Math.floor(((temp - 32) * 5) / 9) + " °C";
      document.getElementById("comment-today").innerHTML = summ;
      let temp_tom = response.data.daily.data[0].temperatureMax;
      document.getElementById("temperature-tomorrow").innerHTML =
        Math.floor(((temp_tom - 32) * 5) / 9) + " °C";
      let temp_two = response.data.daily.data[1].temperatureMax;
      document.getElementById("temperature-in-two-days").innerHTML =
        Math.floor(((temp_two - 32) * 5) / 9) + " °C";
      //set Icons
      let icon = response.data.currently.icon;
      let icon2 = response.data.daily.data[0].icon;
      let icon3 = response.data.daily.data[1].icon;
      function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
      }
      setIcons(icon, document.querySelector(".icon"));
      setIcons(icon2, document.querySelector(".icon2"));
      setIcons(icon3, document.querySelector(".icon3"));
    })
    .catch(error => {
      console.log(error);
      pending = false;
      rejected = true;
      if (rejected) {
        let main3 = (document.getElementById("loading").id = "main");
        document.getElementById("form_location").style.borderColor = "#c95461";
      }
    });
}
