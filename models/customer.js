const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  }
})

module.exports = mongoose.model('Customer', Customer);