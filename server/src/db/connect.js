'use strict';

const mongoose = require('mongoose');
const winston = require('winston');

const db = mongoose.connection;
mongoose.connect('mongodb://192.168.1.108:27017/mitosis');
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  winston.info('Connected to MongoDB');
});

module.exports = db;

