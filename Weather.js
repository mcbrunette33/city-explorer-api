'use strict';
const axios = require('axios')
const Weather = async (req, res) => {

  let { lat, lon } = req.query;
  // console.log(req.query);
  try {
    let weatherApiUrl = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&land=en&lat=${lat}&lon=${lon}&days=5`;
    let weatherData = await axios.get(weatherApiUrl);
    // console.log(weatherData);
    let weatherdata2 = weatherData.data.data.map(p => new Forecast(p));
    res.status(200).send(weatherdata2);
  } catch (error) {
    console.log(error);
  }
};

class Forecast {

  constructor(data) {
    this.date = data.datetime;
    this.description = data.weather.description
  }
}

module.exports = Weather