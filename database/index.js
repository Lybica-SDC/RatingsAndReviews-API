const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
  user: 'namnguyen',
  database: 'rnr',
});

module.exports = db;
