const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'R73mfk19!',
        database: 'employees'
    },
    console.log('Connected to the election database.')
);

module.exports = db;