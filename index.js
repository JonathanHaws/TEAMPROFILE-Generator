
const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');

fs.writeFile('./dist/index.html', 'test', (err)=>{})
fs.writeFile('./dist/style.css', 'test', (err)=>{});

var employees = [];

inquirer.prompt([
    { type: 'input', message: 'What is the managers name?', name: 'name',},
    { type: 'input', message: 'What is the managers id?', name: 'id',},
    { type: 'input', message: 'What is the managers email?', name: 'email',},
    { type: 'input', message: 'What is the managers office id?', name: 'office_id',}

    ]).then(function(response){
        let manager = new Employee(response.name, response.id, response.email)
        console.log(manager);

    });

//{ type: 'list', message: 'What type of employee?', name: 'type', choices: ['Engineer', 'Intern',],}])
