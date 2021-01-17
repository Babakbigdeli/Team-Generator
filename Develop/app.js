const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

teamBuilder();

function teamBuilder() {

    console.log("Answer Below Questions Please")

    inquirer.prompt([
        // Manager 
        {
            type: "input",
            message: "What is your manager's name?",
            name: "name",
            default: "Manager's Name"
        },
        {
            type: "input",
            message: "What is your manager's id?",
            name: "id",
            default: "Manager's ID Number"
        },
        {
            type: "input",
            message: "What is your manager's email?",
            name: "email",
            default: "manager@email.com"
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "officeNumber",
            default: "Manager's Office Number"
        }

    ])

    .then(function (managerInputs) {
        const manager = new Manager(managerInputs.name, managerInputs.id, managerInputs.email, managerInputs.officeNumber);
        employees.push(manager);

                // Listed inquiry to select the type of team member to be added next
        
        teamSelectorPrompt();
        
        function teamSelectorPrompt() {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which type of team member would you like to add?",
                    name: "employee",
                    choices: [
                        "Engineer",
                        "Intern",
                        "None"
                    ]
                }
            ])
            //Engineer Questions
            .then(function (userChoice) {
                if (userChoice.employee === "Engineer") {
                    
                    engineerPrompt();

                    function engineerPrompt() {
                        inquirer.prompt([{
                            type: "input",
                            message: "What is your engineer's name?",
                            name: "name",
                            default: "Engineer's Name"
                        },
                        {
                            type: "input",
                            message: "What is your engineer's id?",
                            name: "id",
                            default: "Engineer's ID Number"
                        },
                        {
                            type: "input",
                            message: "What is your engineer's email?",
                            name: "email",
                            default: "engineer@email.com"
                        },
                        {
                            type: "input",
                            message: "What is your engineer's Github?",
                            name: "github",
                            default: "Engineer's GitHub username"
                        }
                        ])

                            .then(function (engineerInputs) {
                                const engineer = new Engineer(engineerInputs.name, engineerInputs.id, engineerInputs.email, engineerInputs.github);
                                employees.push(engineer);
                                teamSelectorPrompt();
                            })
                    }
                } else if (userChoice.employee === "Intern") {
                // Intern Questions    

                internPrompt();

                    function internPrompt() {
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "What is your intern's name?",
                                name: "name",
                                default: "Intern's Name"
                            },
                            {
                                type: "input",
                                message: "What is your intern's id?",
                                name: "id",
                                default: "Intern's ID Number"
                            },
                            {
                                type: "input",
                                message: "What is your intern's email?",
                                name: "email",
                                default: "intern@email.com"
                            },
                            {
                                type: "input",
                                message: "What is your intern's school?",
                                name: "school",
                                default: "Intern's School"
                            }
                        ])
                
                            .then(function (internInputs) {
                                const intern = new Intern(internInputs.name, internInputs.id, internInputs.email, internInputs.school);
                                employees.push(intern);
                                teamSelectorPrompt();
                            })
                    }
                } else {
                    //If user select 'None' or answered all questions, exit Inquirer and write files
                    const html = render(employees);
                    fs.writeFile(outputPath, html, function (err) {
                        if (err) {
                            return console.log(err);
                        };

                    });

                    console.log("Thats all. Visit the OUTPUT folder and check the result!");


                }
            })
    }
})

}                    
                    

