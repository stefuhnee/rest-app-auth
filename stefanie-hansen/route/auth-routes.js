'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const getBasic = require('../lib/get-basic');
const User = require('../model/user');
const router = express.Router();

router.post('/signin', bodyParser, (req, res) => {
  let authString
});
