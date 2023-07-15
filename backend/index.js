const express = require('express');
const cors = require('cors');
const connectDb = require('./database/connectDB');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require('dotenv').config();

connectDb();
const app = express();
app.use(cors(
  {
    origin: ['https://Admin-User-Authentication.vercel.app'],
    methods: ['POST', 'GET'],
    credentials: true
  }
));

const port = process.env.PORT || 3002;

app.use(express.json());
app.use('/api/admin', require('./routes/adminRoute'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api', require('./routes/dashboardRoute'));

// swagger configuration
const swaggerOptions = {
  definition: {
    openApi: '3.0.0',
    info: {
      title: 'Admin User Authentication API',
      version: '1.0.0',
      description: 'API documentation for the Admin User Authentication',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['swaggerApi.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
