'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Trainer = mongoose.model('Trainer'),
	  _ = require('lodash'),
    ges = require('../services/GES/gesConnection.js'),
    uuid = require('node-uuid'),
    parse = require('co-body'),
    that = this;


exports.create = function *() {
  var body = yield this.request.body;

  if (!body) {
    this.throw("The body is empty", 400);
  }
  if (!body.Credentials.EmailAddress) {
    this.throw("Missing username", 400);
  }
  if (!body.Credentials.Password) {
    this.throw("Missing password", 400);
  }
  console.log(JSON.stringify(body, null, '\t'));
  try {

    //var existingTrainer = Trainer.findOne({ 'email': body.Contact.EmailAddress }).exec();
    //console.log(JSON.stringify(existingTrainer, null, '\t'));
    //
    //if(existingTrainer){
    //  this.throw('Trainer with email: '+body.Contact.EmailAddress+' already exists.', 400);
    //}

    var _event = {
      Contact: body.Contact,
      Credentials: body.Credentials,
      TrainerId: uuid.v1()
      //Source: body.Source,
      //SourceNotes: body.SourceNotes,
      //StartDate: body.StartDate
    };

    var result = yield ges(_event,'HireTrainer');
    this.status = result.Success ? 200 : 400;
    this.body = result.message;
    return;

  } catch (err) {
    this.throw(err);
  }

  this.status = 200;
};


