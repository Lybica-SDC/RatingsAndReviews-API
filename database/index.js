const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
  user: process.env.USER,
  database: process.env.DB_NAME,
  // use dev_host for leval development
  // host: process.env.DEV_HOST,

  // use this section of cloud instance
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
});

module.exports = db;
