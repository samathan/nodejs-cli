var express = require("express");
var bodyParser = require("body-parser");
var moment = require("moment");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/birthday/:firstname/:lastname/:birthdate", findBirthday);

function findBirthday(req, res, next) {

    var firstname = req.params.firstname;
    var lastname = req.params.lastname;
    var birthdate = req.params.birthdate


    findAndWish(firstname, birthdate);

}

function findAndWish(firstname, dob) {

    var splitdob = dob.split('-');
    var month = splitdob[0];
    var day = splitdob[1];
    var d = new Date();
    d.setMonth(month);
    d.setDate(day);

    let birthday = moment(d);
    let today = moment();

    if (birthday.isSame(today)) {
        console.log('Hello' + firstname + '.Happy Birthday');;
    } else {
        console.log('Hello' + firstname + '.You have' + birthday.diff(today, 'days') + 'days until your birtdate');
    }


}


var server = app.listen(8765, function () {
    console.log("Listening on port %s...", server.address().port);
});






