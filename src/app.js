const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');

const app = express();

// middlewares antes de las rutas
app.use(express.json());
app.use(helmet());
app.use(cors());

// rutas
app.use('/api/v1', router);
app.all('/*', (req, res) => {
  return res.send('Welcome to the kitchen recipes API');
});

// middlewares después de las rutas
app.use(errorHandler);

module.exports = app;
