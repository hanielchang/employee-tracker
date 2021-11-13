const db = require('./db/connection');

function viewDepartments() {
    db.query(
        'SELECT department_name, id FROM departments',
        function (err, results) {
            console.log(results); // results contains rows returned by server

        }
    );
}

function viewRoles() {
    db.query(
        `SELECT
        roles.title, roles.id,
        departments.department_name, roles.salary
        FROM roles
        JOIN departments ON roles.department_id=departments.id`,
        function (err, results) {
            console.log(results); // results contains rows returned by server
        }
    );
}

function viewEmployees() {
    db.query(
        `SELECT
        employees.id,
        employees.first_name, employees.last_name,
        roles.title, departments.department_name, roles.salary
        FROM employees
        JOIN roles ON employees.role_id=roles.id
        JOIN departments ON roles.department_id=departments.id`,
        function (err, results) {
            console.log(results); // results contains rows returned by server
        }
    );
}

function addDepartment(name) {
    const SQLcommand = `INSERT INTO departments (department_name) VALUES (?)`;
    const params = [name];

    db.query(SQLcommand, params,
        function (err, results) {
            // console.log(results); 
        }
    );

    db.query(
        'SELECT department_name, id FROM departments',
        function (err, results) {
            console.log(results); // results contains rows returned by server
        }
    );
}

function addRole(title, salary, department_id) {
    const SQLcommand = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [title, salary, department_id];

    db.query(SQLcommand, params,
        function (err, results) {
            console.log(results);
        }
    );

    db.query(
        `SELECT
        roles.title, roles.id,
        departments.department_name, roles.salary
        FROM roles
        JOIN departments ON roles.department_id=departments.id`,
        function (err, results) {
            console.log(results); // results contains rows returned by server
        }
    );
}

function addEmployee(first_name, last_name, role_id, manager_id) {
    const SQLcommand = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [first_name, last_name, role_id, manager_id];

    db.query(SQLcommand, params,
        function (err, results) {
            console.log(results);
        }
    );

    db.query(
        `SELECT
        employees.id,
        employees.first_name, employees.last_name,
        roles.title, departments.department_name, roles.salary
        FROM employees
        JOIN roles ON employees.role_id=roles.id
        JOIN departments ON roles.department_id=departments.id`,
        function (err, results) {
            console.log(results); // results contains rows returned by server
        }
    );
}

function updateEmployee(role_id, employee_id) {
    const SQLcommand = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [role_id, employee_id];

    db.query(SQLcommand, params,
        function (err, results) {
            // console.log(results); 
        }
    );
        
    db.query(
        `SELECT
        employees.id,
        employees.first_name, employees.last_name,
        roles.title, departments.department_name, roles.salary
        FROM employees
        JOIN roles ON employees.role_id=roles.id
        JOIN departments ON roles.department_id=departments.id`,
        function (err, results) {
            console.log(results); // results contains rows returned by server
        }
    );
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee
};