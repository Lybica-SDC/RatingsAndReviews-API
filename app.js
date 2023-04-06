require('dotenv').config();
const express = require('express');
const path = require('path');
// const router = require('./routes');
const db = require('./db.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../Lybica-Client/dist')));
// app.use('/products', router.products);

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`now listening at https://localhost:${port}`);