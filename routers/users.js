const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { User, validate } = require('../models/user');


router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if(user) return res.status(422).send('User already registered.');

  const salted = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salted);

  user = new User(_.merge(_.pick(req.body, ['name', 'email']), { password: hashed }));

  await user.save();

  const token = jwt.sign(_.pick(user, ['_id', 'email']), config.get('jwt.secretKey'));
  res.header('x-auth-token', token)
    .send(_.omit(user.toObject(), ['password']));
});

module.exports = router;
