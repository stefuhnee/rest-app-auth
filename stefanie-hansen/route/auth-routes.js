'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const getBasic = require('../lib/get-basic');
const User = require('../model/user');
const router = express.Router();

router.get('/signin', getBasic, (req, res, next) => {
  let username = req.auth.username;
  User.findOne({username}, (err, user) => {
    if (err || !user) return next(new Error('Cannot find user'));
    if (!user.comparePassword(req.auth.password)) {
      return next(new Error('Invalid password'));
    }
    return res.json({token: 'access granted'});
  });
});

router.post('/signup', bodyParser, (req, res, next) => {
  let newUser = new User(req.body);
  let username = newUser.username;
  newUser.password = newUser.hashPassword;
  req.body.password = null;
  User.findOne({username}, (err, user) => {
    if (err || user) return next(new Error('Cannot create user'));
    newUser.save((err) => {
      if (err) return next(new Error('Cannot create user'));
      res.json({token: 'access granted'});
    });
  });
});

module.exports = router;
