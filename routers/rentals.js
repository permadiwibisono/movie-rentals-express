const express = require('express');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const router = express.Router();
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const { Rental, validate } = require('../models/rental');

Fawn.init(mongoose, "Fawn");

router.get('/', async (req, res) => {
  const rental = await Rental.find().sort('-dateOut');
  res.send(rental);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
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

  Fawn.Task()
  .save('rentals', rental)
  .update('movies', { _id: movie._id }, {
    $inc:{
      numberInStock: -1
    }
  })
  .run();
  res.send(rental);
});


router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send('The movie with the given ID was not found.');
  res.send(rental);
});

module.exports = router;
