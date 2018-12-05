const express = require('express');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');
const asyncMiddleware = require('../middlewares/async');
const router = express.Router();
const { Genre, validate } = require('../models/genre');

router.get('/', asyncMiddleware(async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
}));

router.post('/', [authMiddleware, adminMiddleware], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name
  });
  await genre.save();
  res.send(genre);
});

router.put('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, { new: true });

  res.send(genre);
});

router.delete('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

module.exports = router;
