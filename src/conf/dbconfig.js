const Pool = require("pg").Pool;
const pool = new Pool({
  user: "user",
  password: "password",
  host: "localhost",
  database: "api",
  port: 5432,
});

module.exports = pool;
