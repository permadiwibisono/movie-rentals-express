const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { genreSchema } = require('./genre');

const Movie = new Schema({
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

module.exports = mongoose.model('Movie', Movie);