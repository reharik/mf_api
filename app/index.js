/**
 * Created by reharik on 7/25/15.
 */
"use strict";

var extend = require('extend');
var config = require('config');
require('babel-polyfill');

process.env['ALLOW_CONFIG_MUTATIONS']=true;
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    // for development use babel/register for faster runtime compilation
    require('babel-register');
}

module.exports = function(_options) {
    var options = {
        dagon:{
            application:'api'
        }
    };
    extend(true, options, config.get('configs') || {}, _options || {});
    var container = require('./registry')(options);
    var api = container.getInstanceOf('server');
    api();
}();


