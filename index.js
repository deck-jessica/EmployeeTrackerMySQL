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
        name: "newDepartment", 
        type: "input", 
        message: "Enter Name for New Department.",
        validate: (input) => {
            if ( !input ) { return 'Must enter an answer.'; }
            return true;
        },
    })
    .then(response => {
        connection.query("INSERT INTO department SET ?",
        {   id: response.id,
            deptName: response.newDepartment },
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

function buildEmployee () {
    inquirer
    .prompt([
        {
            name: "firstName", 
            type: "input", 
            message: "Enter the employee's first name.",
            },
        {
            name: "lastName", 
            type: "input", 
            message: "Enter the employee's last name.",
            },
        
        {
            name: "roleId", 
            type: "input", 
            message: "Enter employee's role.", 
        },

        {
            name: "managerId", 
            type: "list", 
            message: "Choose employee's manager.", 
            choices: [ 1, 2, 3, 4, 5]
        }
    ])
    .then(response => {
        connection.query("INSERT INTO employee SET ?",
        {   id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            roleId: response.roleId,
            manager_id: response.managerId
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${response.firstName} ${response.lastName} has been added as a new employee.`);
            runSearch();
        });
    });
};

function viewDepts  ()  {
    connection.query(`SELECT * FROM department`, (err, res) => {
      if (err) throw err; 
      console.table(res); 
      runSearch();
    });
};

function viewRoles () {
    connection.query(`SELECT * FROM role`, (err, res) => {
      if (err) throw err; 
      console.table(res); 
      runSearch();
    });
};

function viewEmployees () {
    connection.query(`SELECT * FROM employee`, (err, res) => {
      if (err) throw err; 
      console.table(res); 
      runSearch();
    });
};