'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const authRouter = require('./route/auth-routes');

mongoose.connect('mongodb://localhost/dev_db');

app.use(morgan('tiny'));

app.use('/', authRouter);

app.use((err, req, res, next) => {
  res.status(500).json({message: err.message});
  next(err);
});

app.use('*', (req, res) => {
  res.status(404).json({message: 'Not found'});
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
