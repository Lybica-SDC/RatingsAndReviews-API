const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
  user: 'namnguyen',
  database: process.env.DB_NAME,
});

module.exports = db;
