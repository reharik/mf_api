/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    TrainerSummary = mongoose.model('TrainerSummary');
//_ = require('lodash')
//ges = require('../services/GES/gesConnection.js'),
//uuid = require('node-uuid'),
//parse = require('co-body');


exports.trainers  = function *() {
  var trainers = yield TrainerSummary.find().exec();
  this.body = {"trainerSummaries":trainers};
  this.status = 200;
};

