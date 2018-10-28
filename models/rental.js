const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { genreSchema } = require('./genre');

const rentalSchema = new Schema({
  customer: {
    type: new Schema({
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
    }),
    required: true
  },
  movie: {
    type: new Schema({
      genre: genreSchema,
      title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        trim: true
      },
      dailyRentalRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 255,
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturn: {
    type: Date
  },
  rentalFee:{
    type: Number,
    default: 0,
    min: 0
  }
})

module.exports = {
  rentalSchema,
  Rental: mongoose.model('Rental', rentalSchema),
};