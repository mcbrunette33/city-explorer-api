'use strict';
const weatherData = require('./weather.json')
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios')
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Default');
});

// app.get('/weather', (req, res) => {
//   res.json({ 'weather': 'is todays weather' });
// });

app.get('/weather', async (req, res) => {
  console.log(req);
  let { lat, lon } = req.query;
  // console.log(req.query.location);
  try {
    // let searchQuery = req.body;

    let weatherApiUrl = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&land=en&lat=${lat}&lon=${lon}&days=5`;
    let weatherData = await axios.get(weatherApiUrl);
    console.log(weatherData.data.data);
    let weatherdata2 = weatherData.data.data.map(p => new Forecast(p));
    res.status(200).send(weatherdata2);
    // let locationData = weatherData.find(data => data.city_name.toLowerCase() === locationInput.toLowerCase());
    // console.log(locationData);
  } catch (error) {
    console.log(error);
  }
});

app.get('/movie', async (req, res) => {
  try {
    let locationCity = req.query.locationCity;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${locationCity}&page=1&include_adult=false`;
    let movieLog = await axios.get(movieUrl);
    let movieArr = movieLog.data.results.map(object => new Movies(object));
    res.status(200).send(movieArr);
  } catch (error) {
    console.log(error);
  }
})

app.get('*', (req, res) => {
  throw new Error('Not working!');
});
// app.get('*', (req, res) => {
//   res.status(404).send('not found');
// });
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

class Forecast {

  constructor(data) {
    this.date = data.datetime;
    this.description = data.weather.description
  }
}

class Movies {
  constructor(dataset){
    this.title = dataset.title;
    this.popularity = dataset.popularity;
    this.overview = dataset.overview;
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`))