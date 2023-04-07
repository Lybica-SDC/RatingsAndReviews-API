require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
// const router = require('./routes');
const db = require('./database/db.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET route
router.get('/', (req, res) => {
  res.json(response);
})

//POST route
router.post('/', (req, res) => {
  res.sendStatus(201);
})

//PUT route
router.put('/', (req, res) => {
  res.sendStatus(204);
})

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`now listening at https://localhost:${port}`);