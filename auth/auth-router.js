const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('./auth-model.js');
const generateToken = require('../middlewares/generateToken');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(user);
      res.status(201).json({user: saved, token: token});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
