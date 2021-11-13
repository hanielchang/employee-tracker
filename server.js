const { response } = require('express');
const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/connection');
const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee
} = require('./functions');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('\n\nDatabase connected.');
    //   app.listen(PORT, () => {
    //     console.log(`Server running on port ${PORT}`);
    //   });
});


// Prompt for department name 
const promptDepartmentName = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: "What is the department name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid department name!');
                    return false;
                }
            }
        }
    ])
}

const promptRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "What is the role name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid role name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid salary.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'department',
            message: "What is the department id?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid department id.');
                    return false;
                }
            }
        }
    ])
}

const promptEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid first name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid last name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's role?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid department id.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'manager',
            message: "Who is the employee's manager?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid name.');
                    return false;
                }
            }
        }
    ])
}

const promptUpdate = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: "What is the employee's Id?"
        },
        {
            type: 'input',
            name: 'newRole',
            message: "What is the person's new Role?"
        }
    ])
}




const mainPrompt = () => {
    console.log('=================================================');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: '',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ])
        .then(menu => {
            selection = menu.choice;
            switch (selection) {
                case 'View all departments':
                    viewDepartments();
                    return mainPrompt();

                case 'View all roles':
                    viewRoles();
                    return mainPrompt();

                case 'View all employees':
                    viewEmployees();
                    return mainPrompt();

                case 'Add a department':
                    promptDepartmentName()
                        .then(response => {
                            addDepartment(response.department);
                            return mainPrompt();
                        })
                    break;

                case 'Add a role':
                    promptRole()
                        .then(response => {
                            addRole(response.role, response.salary, response.department);
                            return mainPrompt();
                        })
                    break;

                case 'Add an employee':
                    promptEmployee()
                        .then(response => {
                            addEmployee(response.firstName, response.lastName, response.role, response.manager);
                            return mainPrompt();
                        })
                    break;
                case 'Update an employee role':
                    promptUpdate()
                        .then(response => {
                            updateEmployee(response.newRole, response.employeeId);
                            return mainPrompt();
                        })
                    break;
            }

        })
};

mainPrompt();

