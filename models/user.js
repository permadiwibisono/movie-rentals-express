const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(user, schema);
}

function validateLogin(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(user, schema);
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 1024
  }
})

module.exports = {
  userSchema,
  User: mongoose.model('User', userSchema),
  validate: validateUser,
  validateLogin
};