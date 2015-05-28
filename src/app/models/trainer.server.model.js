'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Trainer Schema
 */
var TrainerSchema = new Schema({
    _id: {
        type: String,
        default: '',
        trim: true
    },
    FirstName: {
        type: String,
        default: '',
        required: 'Please fill Trainer first name',
        trim: true
    },
    LastName: {
        type: String,
        default: '',
        required: 'Please fill Trainer last name',
        trim: true
    },
    EmailAddress: {
        type: String,
        default: '',
        required: 'Please fill Trainer email address',
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

mongoose.model('Trainer', TrainerSchema);
