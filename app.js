require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const indexRouter = require('./routes');
const db = require('./database/db.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create a reviews route
app.use('/reviews', indexRouter);

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`now listening at https://localhost:${port}`);