const express = require('express');
const app = express();
require('dotenv').config()



app.use(express.json())
app.use(express.urlencoded())



const PORT = process.env.PORT
app.listen(PORT)

console.log(`listening on port ${PORT}`);