'use strict';

var _ = require('lodash');
/**
 * Load app configurations
 */
  module.exports  =require('./env/all'),
// this is not doing a deep merge
module.exports = _.merge(
  require('./env/all'),
  require('./env/' + process.env.NODE_ENV) || {}
);

