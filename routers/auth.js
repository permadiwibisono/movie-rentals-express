const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User, validateLogin } = require('../models/user');

router.post('/', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send("Invalid email or password");

  const token = jwt.sign(_.pick(user, ['_id', 'email']), 'jwtPrivateKey');

  res.send({ token });
});

module.exports = router;
