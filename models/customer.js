const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(customer, schema);
}

const customerSchema = new Schema({
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

module.exports = {
  customerSchema,
  Customer: mongoose.model('Customer', customerSchema),
  validate: validateCustomer
};