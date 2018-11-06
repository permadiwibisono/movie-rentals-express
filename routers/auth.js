const express = require('express');
const router = express.Router();
const { User, validateLogin } = require('../models/user');


router.post('/', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  res.send(user);
});

module.exports = router;
