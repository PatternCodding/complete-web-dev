
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

     

 app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
        

app.post("/", function (req, res) {
    // console.log("input recieved");
    // console.log(req.body.cityName);

    const query = req.body.cityName
    const apiKey = "b18ab8b2d5a98d996e11c34ce67ef311";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + "";

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
            
            res.write("<p> the weather in " + query + " is " + description + "</p" + "<br>");
            res.write("<h1>The Temperature is " + temp + " degree Celcius</h1>")
            // res.send("<h1>The Temperature is " + temp + " degree Celcius</h1>")
            res.write("<img src=" + imgURL + ">");
            res.send();
        })
    })
})


// server
app.listen(3000, function () {
    console.log("Server running on Port 3000, no interrupt!");

});
