const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
  user: process.env.USER,
  database: process.env.DB_NAME,
});

module.exports = db;
