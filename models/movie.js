const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { genreSchema } = require('./genre');

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255),
    dailyRentalRate: Joi.number().min(0).max(255)
  };

  return Joi.validate(movie, schema);
}

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    trim: true
  },
  genre:{
    type: genreSchema,
    required: true
  },
  numberInStock:{
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  }
})

module.exports = {
  movieSchema,
  Movie: mongoose.model('Movie', movieSchema),
  validate: validateMovie
};