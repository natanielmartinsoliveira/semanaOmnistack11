const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app
