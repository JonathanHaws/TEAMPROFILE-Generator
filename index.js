
const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');

inquirer.prompt([
    { type: 'input', message: 'What is the managers name?', name: 'name',},
    { type: 'input', message: 'What is the managers id?', name: 'id',},
    { type: 'input', message: 'What is the managers email?', name: 'email',},
    { type: 'input', message: 'What is the managers office id?', name: 'office_id',}

    ]).then(function(response){
        let manager = new Manager(response.name, response.id, response.email, response.office_id);
        console.log(manager.getRole());

        let htmlcontent = '<div> <p> Manager </p>' + manager.getName() + '</div>';
        let htmldocument = '<!DOCTYPE html>\n  <head>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    ' + htmlcontent + '  </body>\n</html>';

        fs.writeFile('./dist/index.html', htmldocument, (err)=>{})
        fs.writeFile('./dist/style.css', '', (err)=>{});
    });

//{ type: 'list', message: 'What type of employee?', name: 'type', choices: ['Engineer', 'Intern',],}])
