const express = require("express");
const { STATUS_CODES } = require("http");
const https = require("https");
const app = express();


// adding app.get
app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Abakaliki&appid=b18ab8b2d5a98d996e11c34ce67ef311";

    https.get(url, function (response) {
        // console.log(response, STATUS_CODES); 
        response.on("data", function (data) {
            //  console.log(data);
            const weatherData = JSON.parse(data)
            console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log(temp);
            const description = weatherData.weather[0].description
            console.log(description);
            const fealLike = weatherData.main.feels_like;
            console.log(fealLike);
        
            // working to send respond to client server.
            // now adding an icon to our weather description
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.write("<p> the weather in Abakaliki is " + description + "</p" + "<br>");
            res.write("<h1>The Temperature is " + temp + " degree Celcius</h1>")
            // res.send("<h1>The Temperature is " + temp + " degree Celcius</h1>")
            res.write("<img src=" + imgURL + ">");
            res.send();
        })
    })
  
})

// b18ab8b2d5a98d996e11c34ce67ef311
// weather website: https://openweathermap.org/


app.listen(3000, function () {
    console.log("Server running on Port 3000, no interrupt!");

});
