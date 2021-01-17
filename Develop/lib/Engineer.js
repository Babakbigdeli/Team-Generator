// Define and export Engineer class as dependant of Employee class
// https://www.w3schools.com/jsref/jsref_class_super.asp
// https://www.w3schools.com/jsref/jsref_class_extends.asp

const Employee = require("./Employee");
class Engineer extends Employee {
    constructor(name, id, email, gitHubUserName){
        super(name, id, email)
        this.gitHubUserName = gitHubUserName
    }
    getGithub(){
        return this.gitHubUserName
    }
    getRole(){
        return "Engineer"
    }
}

module.exports = Engineer