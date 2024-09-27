const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Deexith@06',
  database: 'railway_system'
});

module.exports = db;
