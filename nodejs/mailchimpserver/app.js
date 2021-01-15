const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
    // res.send("Tump ishte ");
});


app.post("/", function(req, res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }]
    };
    var jsondata = JSON.stringify(data);
    // make a request;
    const url = "https://us7.api.mailchimp.com/3.0/lists/076b2dc402";
    const options = {
        method: "POST",
        auth: "harry:178dbb21820a93da84f5cb6c1d6394fa-us7",
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });

    });

    request.write(jsondata);
    request.end();


});





// list id 076b2dc402
// api key 178dbb21820a93da84f5cb6c1d6394fa-us7
app.listen(3003, function() {
    console.log("Server is running");
});