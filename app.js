var express = require("express");
var bodyParser = require("body-parser");

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

    let splitdob = dob.split('-');
    let month = splitdob[0];
    let day = splitdob[1];
    birthdayMonth = parseInt(month);
    birthdayDay = parseInt(day);

    today = new Date();
    birthday = new Date();

    birthday.setMonth(birthdayMonth - 1);
    birthday.setDate(birthdayDay);
    if (today > birthday) {

        birthday.setYear(today.getFullYear() + 1);
    }

    diff = Math.abs(birthday.getTime() - today.getTime());
    diff = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diff == 0) {
        console.log('Hello ' + firstname + '.Happy Birthday');;
    }
    else {
        console.log('Hello ' + firstname + '.You have ' + diff + ' days until your birtdate');
    }

}


var server = app.listen(8765, function () {
    console.log("Listening on port %s...", server.address().port);
});






