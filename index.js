
const inquirer = require('inquirer');
const fs = require('fs');

fs.writeFile('./dist/index.html', 'test', (err)=>{})
fs.writeFile('./dist/style.css', 'test', (err)=>{});

inquirer.prompt([
    { type: 'input', message: 'What is the managers name?', name: 'name',},
    { type: 'input', message: 'What is the managers id?', name: 'id',},
    { type: 'input', message: 'What is the managers email?', name: 'email',},
    { type: 'input', message: 'What is the managers office id?', name: 'office_id',}

    ]).then(function(response){
        console.log('test');

    });

//{ type: 'list', message: 'What type of employee?', name: 'type', choices: ['Engineer', 'Intern',],}])
