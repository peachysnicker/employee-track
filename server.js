const express = require('express');
const fs = require("fs");
const inquirer = require("inquirer");

const cTable = require('console.table');

// Import and require mysql2
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employee_trackerDB'
  },
  console.log(`Connected to the employee_trackerDB database.`)
);
//start function to prompt questions on connection
db.connect(function (err) {
    if (err) throw err
    startPrompt();
})

//prompt for questions
function startPrompt() {
inquirer
.prompt(
    [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee', 'Quit'],
        },
    ])
    .then(function(val) {
    //Using switch statement to pass the chosen option from above 
    switch (val.options) {
        case 'View All Departments':
            viewAllDepartments(); //done
            break;
        case 'View All Roles':
            viewAllRoles(); //done
            break;
        case 'View All Employees':
            viewAllEmployees(); //done
            break;
        case 'Add Department':
            addDepartment(); //done
            break;
        case 'Add Role':
            addRole(); //done
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee':
            updateEmployee();
            break;
        }
    });
}

//view all departments
function viewAllDepartments() {
    db.query("SELECT * FROM department", function (err, results) {
        console.table(results);
        startPrompt();
  })
}

//view all roles
function viewAllRoles() {
    db.query("SELECT * FROM role", function (err, results) {
        console.table(results);
        startPrompt();
    });
};

//view all employees
function viewAllEmployees() {
    db.query("SELECT * FROM employee", function (err, results) {
        console.table(results);
        startPrompt();
        
    });
};

//add department function
function addDepartment() {
    app.post
}
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter deparment name',
                name: 'name',
            },
        ])
        .then((answer) => {
            const newDept = answer;
            db.query("INSERT INTO department VALUES ?", 
            {
                name: answer.name },
                 function (err, res) {
                console.log(`New department has been added to the database.`);
                console.table(answer);
                startPrompt();
            })
        })
};

//add roles function
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter name of role',
                name: 'title',
            },
            {
                type: 'input',
                message: 'Enter salary of the role',
                name: 'salary',
            },
            {
                type: 'input',
                message: 'Enter department ID for the role',
                name: 'department_id',
            },
        ])
        .then((response) => {
            db.query("INSERT INTO role SET ?", 
            {
                title: response.title,
                salary: response.salary,
                department_id: response.department_id,
              },
              function(err) {
                if (err) throw err
                console.table(response);
                startPrompt();
            });
        })
};
//add employee function
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter first name of the employee',
                name: 'first_name',
            },
            {
                type: 'input',
                message: 'Enter last name of the employee',
                name: 'last_name',
            },
            {
                type: 'input',
                message: 'Enter role ID',
                name: 'role_id',
            },
            {
                type: 'input',
                message: 'Enter manager ID for the role',
                name: 'manager_id',
            },
        ])
        .then((response) => {
            db.query("INSERT INTO employee SET ?", 
            {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: response.role_id,
                manager_id: response.manager_id,
              },
              function(err) {
                if (err) throw err
                console.table(response);
                startPrompt();
            });
        })

};


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
