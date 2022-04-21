'use strict';

const Movie = (req, res) => {
  try {
    let locationCity = req.query.locationCity;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${locationCity}&page=1&include_adult=false`;
    let movieLog = await axios.get(movieUrl);
    let movieArr = movieLog.data.results.map(object => new Movies(object));
    res.status(200).send(movieArr);
  } catch (error) {
    console.log(error);
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
