const mysql = require("mysql2");
require("dotenv").config();

// This is for pool connect
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Use only testing time
const connectionTesting = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  password: "",
  database: "glhubs_local",
});
console.log("Database Config:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connectionPool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the production database:", err.message);
  } else {
    console.log("Connected to the production database.");
    connection.release();
  }
});

// module.exports = db;
module.exports = {
  connectionBclMYSQL: connectionPool,
  // connectionMYSQLGeneral: connection,
  connectionLocalHost: connectionTesting,
};
