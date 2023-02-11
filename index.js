
const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');

function createCard(name, role, id, email, role_specific_info){
    let textstyle = 'color:#d1d1d1;'
    let header = '<h1 style="'+textstyle+'">' + name + '</h1>';
    header += '<h2 style="'+textstyle+'">'+ role + '</h2>';
    let info ='<h3 style="'+textstyle+'">'+ id + '</h3>';
    info += '<h3 style="'+textstyle+'">'+ email + '</h3>';
    info += '<h3 style="'+textstyle+'">'+ role_specific_info + '</h3>';
    let cardstyle = 'width:min-content; margin:auto; '
    let headerstyle = 'background-color:#9c7535; padding:15px; border-radius:12px 12px 0px 0px;';
    let infostyle = 'background-color:#ba8c41; padding:15px; border-radius:0px 0px 12px 12px;'
    return '<div style="'+ cardstyle +'"><div style="'+ headerstyle +'">'+ header +'</div><div style ="' + infostyle + '">' + info + '</div></div>\n';
}

async function promptForEmployee(manager){
    if (manager){ var role = "Manager"; } else { var role = await inquirer.prompt({ type: 'list', message: 'What type of employee are they?', choices: ['Engineer', 'Intern',], name:'role'}); role = role.role;} 
    var name  = await inquirer.prompt({ type: 'input', message: 'What is the employees name?', name:'name' }); name = name.name;
    var id    = await inquirer.prompt({ type: 'input', message: 'What is the employees id?', name:'id' }); id = id.id;
    var email = await inquirer.prompt({ type: 'input', message: 'What is the employees email?', name:'email' }); email = email.email;
     
    if (role == "Manager"){ 
        var officeId = await inquirer.prompt({ type: 'input', message: 'What is their office id?', name:'officeId' }); officeId = officeId.officeId;
        return new Manager(name, id, email, officeId)
    } else if (role == "Engineer"){
    } else if (role == "Intern"){         
    }
    return new Employee(name, id, email);
}

promptForEmployee("Manager").then( function(manager){ console.log(manager) })

//let htmldoccument; let cssdocument;
//htmldoccument = createCard(manager.getName(),manager.getRole(),manager.getId(),manager.getEmail(),manager.getOfficeNumber());
//htmldocument = '\n<!DOCTYPE html>\n  <head>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    ' + htmldoccument + '  </body>\n</html>\n';
//cssdocument = '\nbody{\n background-color:#d1d1d1;\n text-align:center;\n}\n'
//fs.writeFile('./dist/index.html', htmldocument, (err)=>{})
//fs.writeFile('./dist/style.css', cssdocument , (err)=>{});


