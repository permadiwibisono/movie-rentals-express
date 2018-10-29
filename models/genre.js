const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  Genre: mongoose.model('Genre', genreSchema)
};