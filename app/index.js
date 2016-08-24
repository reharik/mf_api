/**
 * Created by reharik on 7/25/15.
 */
"use strict";

process.env['ALLOW_CONFIG_MUTATIONS']=true;
var extend = require('extend');
var config = require('config');

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


