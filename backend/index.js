const express = require('express');
const connectDb = require('./database/connectDB');

require('dotenv').config();

connectDb()
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());



app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
module.exports = app;