const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(genre, schema);
}

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  }
})

module.exports = {
  genreSchema,
  Genre: mongoose.model('Genre', genreSchema),
  validate: validateGenre
};