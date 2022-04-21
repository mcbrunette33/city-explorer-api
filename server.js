'use strict';
const weatherData = require('./weather.json')
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios')
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
const handleHome = require('./handleHome');
const Weather = require('./Weather');


app.get('/', handleHome);

app.get('/weather', Weather);

app.get('/movie', Movie);

app.get('*', (req, res) => {
  throw new Error('Not working!');
});
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`))