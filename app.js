//read what's inside search bar
let formLocation = document.getElementById("location");

//run function on submit
formLocation.addEventListener("submit", geocode);

//Let's get some API response...
function geocode(e) {
  // Prevent actual submit
  e.preventDefault();

  var location = document.getElementById("form_location").value;

  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: "AIzaSyDHW9n1b3HJf13N-W_CRcJB1YRfRPzDps0"
      }
    })
    .then(function(response) {
      // Log full response
      console.log(response);
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      return axios.get(
        `${proxy}https://api.darksky.net/forecast/04ffe3c8e0cdd04db48a3b60e1050492/${lat},${lng}`
      );
    })
    .then(function(response) {
      console.log(response);
      let temp = response.data.currently.temperature;
      document.getElementById("contain").innerHTML = temp + " F";
    })
    .catch(error => console.log(error));
}
geocode();
