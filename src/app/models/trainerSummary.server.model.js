'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * TrainerSummary Schema
 */
var TrainerSummarySchema = new Schema({
    _id: {
        type: String
    },
    FirstName: {
      type: String
	  },
    LastName: {
        type: String
    },
    EmailAddress: {
        type: String
    },
    Phone: {
        type: String
    },
    Archived: {
        type: Boolean,
        default: false
    },
	  ArchiveDate: {
      type: Date
    }
});

mongoose.model('TrainerSummary', TrainerSummarySchema);
