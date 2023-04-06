const pgp = require('pg-promise')();
require('dotenv').config();
const db = pgPromise({
  user: 'namnguyen',
  host: 'localhost',
  database: 'Reviews',
  port: process.env.PORT,
});

module.exports = db;