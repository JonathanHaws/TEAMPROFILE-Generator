
const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');

function createCard(employee, infotextcolor, headercolor, infocolor, headertextcolor){
    let headertextstyle = 'color:' + headertextcolor; +';'
    let infotextstyle = 'color:' + infotextcolor; +';'
    let cardstyle = 'width:150px; margin:auto; padding-top:20px;'
    let headerstyle = 'background-color:'+ headercolor + '; border-radius:12px 12px 0px 0px;';
    let infostyle = 'background-color:'+ infocolor + '; border-radius:0px 0px 12px 12px;'
    let header = '<h2 style="'+headertextcolor+'">' + employee.getName() + '</h2>'
    let info = '<h3 style="'+infotextstyle+'"> Role: '+ employee.getRole() + '</h3>'
    info +='<h3 style="'+infotextstyle+'"> ID: '+ employee.getId() + '</h3>' + '<h3 style="'+infotextstyle+'">Email: '+ employee.getEmail() + '</h3>';
    switch (employee.getRole()){
        case 'Manager': info += '<h3 style="'+infotextstyle+'"> Office Number: '+ employee.getOfficeNumber()+ '</h3>';  break;
        case 'Engineer':break;
        case 'Intern':break;
    }
    return '<div style="'+ cardstyle +'"><div style="'+ headerstyle +'">'+ header +'</div><div style ="' + infostyle + '">' + info + '</div></div>\n';
}

async function promptForEmployee(manager){ // Probably a better way to get the value of a prompt without having to put each attribute 5 times!
    if (manager){ var role = "Manager"; } else { var role = await inquirer.prompt({ type: 'list', message: 'What type of employee is the next one?', choices: ['Engineer', 'Intern',], name:'role'}); role = role.role;} 
    var name  = await inquirer.prompt({ type: 'input', message: 'What is the '+ role + "'s name?", name:'name' }); name = name.name; 
    var id    = await inquirer.prompt({ type: 'input', message: 'What is the '+ role + "'s id?", name:'id' }); id = id.id;
    var email = await inquirer.prompt({ type: 'input', message: 'What is the '+ role + "'s email?", name:'email' }); email = email.email;  
    switch (role){ 
        case 'Manager': var officeId = await inquirer.prompt({ type: 'input', message: 'What is their office id?', name:'officeId' }); officeId = officeId.officeId;
            return new Manager(name, id, email, officeId)
        default:
            return new Employee(name, id, email);
    }
}

async function promptForTeam(){
    var team = [await promptForEmployee("Manager")];
    for (i = 1; 1<2 ; i++){ 
        team[i] = await promptForEmployee(); //console.log(team[i]);
        var finished = await inquirer.prompt({ type: 'list', message: 'Are you finished adding employees?', choices: ['Yes', 'No',], name:'answer'});
        if (finished.answer == "Yes") {return team}
    }
}

function createTeamProfile(style){
    promptForTeam().then(function(team){ //console.log(team);
        var htmldoccument =''; var cssdocument =''; 
        for (i=0; i<team.length; i++){ htmldoccument+= createCard(team[i], style.colors[3], style.colors[1], style.colors[2], style.colors[1], style.colors[2])}
        htmldocument = '\n<!DOCTYPE html>\n  <head>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n' 
        htmldocument += '   <div style ="margin:0px; background-color: ' + style.colors[1] + '"> <h1 style="color:'+ style.colors[2] +';"> Team Profiles </h1> </div>' + htmldoccument + '  </body>\n</html>\n';
        cssdocument = '\nbody{\n  margin: 0px;\n  background-color:' + style.colors[0] + ';\n  text-align:center; color:'+ style.colors[0] + '\n}\n'
        cssdocument += 'h1,h2,h3{ margin:0px; padding:5px;}';
        fs.writeFile('./dist/index.html', htmldocument, (err)=>{})
        fs.writeFile('./dist/style.css', cssdocument , (err)=>{});
})}

createTeamProfile({colors:['#2b2b2b','#b85f4d','#c2c2c2','#737373']})
