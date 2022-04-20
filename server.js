'use strict';
const weatherData = require('./weather.json')
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.get('/', (req,res)=>{
  res.send('Default');
});

// app.get('/weather', (req, res) => {
//   res.json({ 'weather': 'is todays weather' });
// });

app.get('/weather', (req, res) => {
  // let locationInput = 'Seattle';
  let locationInput = req.query.location;
  // console.log(req.query.location);
  let locationData = weatherData.find(data => data.city_name.toLowerCase() === locationInput.toLowerCase());
  // console.log(locationData);
  let forecast = new Forecast(locationData.data);
  res.send(forecast);
});

app.get('*', (req, res) => {
  throw new Error('Not working!');
});
// app.get('*', (req, res) => {
//   res.status(404).send('not found');
// });
app.use( (error, req, res, next )=>  {
  res.status(500).send(error.message);
});

class Forecast {
  
  constructor(data){
    this.date = data[0].datetime;
    this.description = data[0].weather.description
  }
}
app.listen(PORT,() => console.log(`listening on ${PORT}`))