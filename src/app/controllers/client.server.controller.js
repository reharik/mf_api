'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Client = mongoose.model('Client'),
	  _ = require('lodash'),
    ges = require('../services/ges/gesConnection.js'),
    uuid = require('node-uuid'),
    parse = require('co-body'),
    that = this;


exports.create = function *() {
  console.log(JSON.stringify(this.body, null, '\t'));
  //var body = yield parse(this);
  var client = new Client(body.item);
  var existingClient = yield Client.findOne({ 'Contact.EmailAddress': client.EmailAddress }).exec();

  this.assert(!existingClient, 400, 'Client with email: '+client.EmailAddress+' already exists.');

  var _event = {
    Contact: {  FirstName: client.FirstName,
        LastName: client.LastName,
        EmailAddress: client.EmailAddress,
        Phone: client.Phone,
        SecondaryPhone: client.SecondaryPhone
    },
    TrainerId: client.TrainerId,
    Source: client.Source,
    SourceNotes: client.SourceNotes,
    StartDate: client.StartDate
  };
  this.body = yield ges(_event,req.body.cmdName);
};


