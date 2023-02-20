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

//prompt for questions
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
    .then()
    //Using switch statement to pass the chosen option from above 
    switch (response.options) {
        case 'View All Departments':
            allDepartments();
            break;
        case 'View All Roles':
            allRoles();
            break;
        case 'View All Employees':
            allEmployees();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee':
            updateEmployee();
            break;
        case 'Quit':  //might need something to actually end the program.  This just ends the switch statement
            console.log("Thank you, the program will now end.");
            process.exit(code);

    }





// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
