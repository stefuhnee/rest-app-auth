'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const authRouter = require('route/auth-routes');

mongoose.connection('mongodb://localhost/dev_db');

app.use('*', morgan);

app.use('/', authRouter);

app.use((err, req, res, next) => {
  res.status(500).json({message: err.message});
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
