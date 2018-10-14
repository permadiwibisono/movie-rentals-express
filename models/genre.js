const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Genre = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  }
})

module.exports = mongoose.model('Genre', Genre);