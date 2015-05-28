/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ClientSummary = mongoose.model('ClientSummary');
//_ = require('lodash')
//ges = require('../services/GES/gesConnection.js'),
//uuid = require('node-uuid'),
//parse = require('co-body');


exports.clients  = function *() {
  var clients = yield ClientSummary.find().exec();
  this.body = {"clientSummaries":clients};
  this.status = 200;
};

