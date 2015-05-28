'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Client Schema
 */
var ClientSchema = new Schema({
    _id: {
        type: String,
        default: '',
        trim: true
    },
    FirstName: {
        type: String,
        default: '',
        required: 'Please fill Client first name',
        trim: true
    },
    LastName: {
        type: String,
        default: '',
        required: 'Please fill Client last name',
        trim: true
    },
    EmailAddress: {
        type: String,
        default: '',
        required: 'Please fill Client email address',
        trim: true
    },
    Phone: {
        type: String,
        default: '',
        trim: true
    },
    SecondaryPhone: {
        type: String,
        default: '',
        trim: true
    },
    Source: {
        type: String,
        default: '',
        trim: true
    },
    SourceNotes: {
        type: String,
        default: '',
        trim: true
    },
    Archived: {
        type: Boolean,
        default: false
    },
    ArchiveDate: {
        type: Date,
        default: Date.now
    },
	StartDate: {
		type: Date,
		default: Date.now
	},
    Dob: {
        type: Date
    }
});

mongoose.model('Client', ClientSchema);
