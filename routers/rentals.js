const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const { Rental } = require('../models/rental');

router.get('/', async (req, res) => {
  const rental = await Rental.find().sort('-dateOut');
  res.send(rental);
});

router.post('/', async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);

  if(!customer) return res.status(422).send('Invalid customer!');

  const movie = await Movie.findById(req.body.movieId);

  if(!movie) return res.status(422).send('Invalid movie!');

  if(movie.numberInStock === 0) return res.status(422).send('The movie out of stock!');

  const rental = new Rental({
    customer:{
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      genre: movie.genre
    },
    dateReturn: Date.now(),
    rentalFee: 5
  });
  await rental.save();

  movie.numberInStock--;
  movie.save();

  res.send(rental);
});


router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send('The movie with the given ID was not found.');
  res.send(rental);
});

function validateRental(rental) {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };

  return Joi.validate(rental, schema);
}

module.exports = router;
