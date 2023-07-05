const express = require('express');
const cors = require('cors');
const connectDb = require('./database/connectDB');

require('dotenv').config();

connectDb();
const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/admin', require('./routes/adminRoute'));
app.use('/api/user', require('./routes/userRoute'));



app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
module.exports = app;