'use strict';
const axios = require('axios')

let cache = require ('./cache.js');

const Movie = async (req, res) => {
  let key = 'movie -' + req.query.locationCity;
  if (cache[key] && (Date.now()- cache [key].timestamp < 50000)){
    // console.log(cache[key]);
  } else{

  cache[key]= {};
  cache[key].timestamp = Date.now();
  
  try {
    let locationCity = req.query.locationCity;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${locationCity}&page=1&include_adult=false`;
    let movieLog = await axios.get(movieUrl);
    let movieArr = movieLog.data.results.map(object => new Movies(object));
    cache[key].data = movieArr
  } catch (error) {
    console.log(error);
  }
  console.log('where is this',cache[key])
  res.status(200).send(cache[key].data);
}
}
class Movies {
  constructor(dataset){
    this.title = dataset.title;
    this.popularity = dataset.popularity;
    this.overview = dataset.overview;
  }
}

module.exports = Movie
