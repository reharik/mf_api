'use strict';
var path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  app: {
    title: 'MethodFitness_JS',
    description: 'Full-Stack JavaScript with MongoDB, KOA, ReactJS, FluxJS, and Node.js',
    keywords: 'MongoDB, KOA, ReactJS, Node.js, FluxJS',
    keys: ['methodfitES'],
    root: path.normalize(__dirname + '/../..'),
    env: env

  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig'

};
