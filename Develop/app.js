const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];

function teamBuilder() {

    console.log("Are you ready to build a team?")

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
        teamSelectorPrompt() {
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
                    engineerPrompt() {
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
                    internPrompt() {
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
                    
                    
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
