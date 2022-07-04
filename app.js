const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");
const { response } = require("express");


const app = express();

// to access other static files like the css and the image
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


// the post side of it
app.post("/", function (req, res) {
    // pulling up value in our form
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    console.log(firstName, lastName, email);

    // this section comes after getting ur API key and audience id on mailchimp.com

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    // adding our url from the mailchimp

    const url = "https://us12.api.mailchimp.com/3.0/lists/a0ce0d80f0";


  

    //  the option parameter
    
    const options = {
        method: "POST",
        auth: "Chinedum:3637fcc5df2bf9848fcbe7f60b66c959-us12"
    }
    // let's require our https data
    
    const request = https.request(url, options, function (response) {


          // adding a status response.
    if (response.statusCode == 200) {
    //    res.send("<h1>Succeefully Subscibed</h1>")
        res.sendFile(__dirname + "/success.html")
    } else {
        // res.send("There was an error with signing up, please try again")
         
         res.sendFile(__dirname + "/failure.html")

   }


        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
        
    })
    request.write(jsonData);
    request.end();
});

// failure redirecting calling
app.post("/failure.html", function(req, res) {
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is rinning on port 3000");
});

// 3637fcc5df2bf9848fcbe7f60b66c959-us12

// a0ce0d80f0

