var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "V@nce103",
  database: "company_db"
});

// connect to the mysql server and sql database
//connection.connect(function(err) {
  //if (err) throw err;
  // run the start function after the connection is made to prompt the user
 // start();
//});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });
  
  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add a new department",
            "Add a new role",
            "Add a new employee",
            "View all departments",
            "View all roles",
            "View all employees",
            "Update employee roles",
            "Exit",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Add a new department":
          buildDept();
          break;
  
        case "Add a new role":
          buildRole();
          break;
  
        case "Add a new employee":
          buildEmployee();
          break;
  
        case "View all departments":
          viewDepts();
          break;
  
        case "View all roles":
          viewRoles();
          break;

        case "View all employees":
            viewEmployees();
            break;
        
        case "Update employee roles":
            updateEmployee();
            break;
        }
      });
  }
  
  function buildDept () {
    inquirer
    .prompt({
        name: "newDepartment", type: "input", message: "Enter Name for New Department.",
        validate: (input) => {
            if ( !input ) { return 'Must enter an answer.'; }
            return true;
        },
    })
    .then(response => {
        connection.query("INSERT INTO department SET ?",
        { name: response.newDepartment },
        (err, res) => {
            if (err) throw err;
            console.log(`${response.newDepartment} department added.`);
            runSearch();
        });
    });
};

function buildRole () {
    inquirer
    .prompt([
        {
            name: "roleName", 
            type: "input", 
            message: "Enter name of the role to add.",
            },
        
        {
            name: "roleSalary", 
            type: "input", 
            message: "Enter annual salary for the new role.", 
        },

        {
            name: "deptId", 
            type: "list", 
            message: "Choose department ID number for new role title.", 
            choices: [ 1, 2, 3, 4, 5]
        }
    ])
    .then(response => {
        connection.query("INSERT INTO role SET ?",
        {
            title: response.roleName,
            salary: parseInt(response.roleSalary),
            department_id: response.deptId
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${response.roleName} has been added.`);
            runSearch();
        });
    });
};