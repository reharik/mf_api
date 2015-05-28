'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ClientSummary Schema
 */
var ClientSummarySchema = new Schema({
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

mongoose.model('ClientSummary', ClientSummarySchema);
