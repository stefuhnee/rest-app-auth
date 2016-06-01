'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const getBasic = require('../lib/get-basic');
const User = require('../model/user');
const router = express.Router();

router.post('/signin', getBasic, (req, res, next) => {
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
  let authString
});
