const program = require('commander');
const { prompt } = require('inquirer');
var moment = require('moment');
var request = require('request');
var http = require('http');


function validateName(name) {
    return name !== '';
}
function validateDate(dateofbirth) {
    let patt = new RegExp("^(0?[1-9]|1[0-2]){1}-(0?[1-9]|1[0-9]|2[0-9]|3[0-1]){1}$");
    let res = patt.test(dateofbirth);
    return res;
}

const questions = [{
    type: 'input',
    name: 'firstname',
    message: 'Enter User FirstName',
    validate: validateName
},
{
    type: 'input',
    name: 'lastname',
    message: 'Enter User LastName',
    validate: validateName
},
{
    type: 'input',
    name: 'birthdate',
    message: 'Enter User Date of Birth (MM-DD)',
    validate: validateDate
}
]


program
    .version('1.0.0')
    .description('Cli Application');

program
    .command('add')
    .alias('a')
    .description('Add a new User')
    .action(() => {
        prompt(questions).then(answers => {
            let firstname = answers.firstname;
            let lastname = answers.lastname;
            let birthdate = answers.birthdate;
            console.log(answers);


            http.get('http://localhost:8765/birthday/' + firstname + '/' + lastname + '/' + birthdate, function (err, res, answers) {
                console.log(res)
            });
        });

    });

program.parse(process.argv);


