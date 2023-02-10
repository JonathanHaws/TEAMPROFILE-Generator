
const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');

function createCard(name, role, id, email, role_specific_info){
    let header = '<h1>' + name + '</h1>\n';
    header += '<h2>'+ role + '</h2>\n';
    let info ='<h3>'+ id + '</h3>\n';
    info += '<h3>'+ email + '</h3>\n';
    info += '<h3>'+ role_specific_info + '</h3>\n';
    return '<div class="card"><div>'+ header+ '</div><div>'+ info +'</div></div>';
}

inquirer.prompt([
    { type: 'input', message: 'What is the managers name?', name: 'name',},
    { type: 'input', message: 'What is the managers id?', name: 'id',},
    { type: 'input', message: 'What is the managers email?', name: 'email',},
    { type: 'input', message: 'What is the managers office id?', name: 'office_id',}

    ]).then(function(response){
        let manager = new Manager(response.name, response.id, response.email, response.office_id);
        console.log(manager.getRole());

        let htmldoccument = createCard(manager.getName(),manager.getRole(),manager.getId(),manager.getEmail(),manager.getOfficeNumber());
        let cssdocument = '\n.card{\n  background-color:coral;  background-color:#d6b65c;\n  padding:15px;\n  width:min-content;\n}\n '
        
        htmldocument = '\n<!DOCTYPE html>\n  <head>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    ' + htmldoccument + '  </body>\n</html>\n';
        fs.writeFile('./dist/index.html', htmldocument, (err)=>{})
        fs.writeFile('./dist/style.css', cssdocument , (err)=>{});
    });

//{ type: 'list', message: 'What type of employee?', name: 'type', choices: ['Engineer', 'Intern',],}])
