var mysql = require('mysql');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'SafeZone'
  });

module.exports = db;
  