const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function queryDB(query) {
 const isDocker =
    process.env.DOCKER === "true" || process.env.DOCKER === true;

  if (isDocker) {
    dbConfig = {
      host: process.env.DB_HOST || "db",  
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "mantisbt",
      password: process.env.DB_PASSWORD || "mantisbt",
      database: process.env.DB_NAME || "bugtracker",
    };
  } else {
    const dbConfigPath = path.join(__dirname, "..", "fixtures", "dbConfig.json");
    dbConfig = JSON.parse(fs.readFileSync(dbConfigPath, "utf8"));
  }

  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute(query);
  await connection.end();

  return rows;
}

async function queryFromFile(fileName) {
  const filePath = path.join(__dirname, "..", "sql", fileName);
  const sql = fs.readFileSync(filePath, "utf8");
  return queryDB(sql);
}

module.exports = { queryDB, queryFromFile };
