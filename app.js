require('dotenv').config();
const express = require('express');
const reviewsRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a reviews route

app.use('/reviews', reviewsRouter);

// app.get('/reviews', (req, res)=>{
//   console.log('here');

// })

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`now listening at https://localhost:${port}`);
