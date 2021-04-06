const mysql = require('mysql2');
require('dotenv').config();

const connectionDatabase = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_DB
});

module.exports = { connection: connectionDatabase }