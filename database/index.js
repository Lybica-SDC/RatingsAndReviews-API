const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
  user: process.env.USER,
  database: process.env.DB_NAME,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
});

module.exports = db;
