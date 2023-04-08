require('dotenv').config();
const express = require('express');
const path = require('path');
const reviewsRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../Lybica-Client/dist')));

app.use('/reviews', reviewsRouter);

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`now listening at https://localhost:${port}`);
