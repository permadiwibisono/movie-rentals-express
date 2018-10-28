const express = require('express');
const Joi = require('joi');
const router = express.Router();
const Movie = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
  const movie = await Movie.find().sort('title');
  res.send(movie);
});

router.post('/', async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);

  if(!genre) return res.status(422).send('Invalid genre!');

  const movie = new Movie({
    genre:{
      _id: genre._id,
      name: genre.name
    },
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await movie.save();
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);

  if(!genre) return res.status(422).send('Invalid genre!');

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    genre:{
      _id: genre._id,
      name: genre.name
    },
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  }, { new: true });

  if(!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  res.send(movie);
});

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255),
    dailyRentalRate: Joi.number().min(0).max(255)
  };

  return Joi.validate(movie, schema);
}

module.exports = router;
