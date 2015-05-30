var passport = require("koa-passport");
var User = require("../modules/readModels/user");
var ges = require('../modules/ges/gesConnection.js');
var config = require('../../config/config');

var db = require('monk')(config.mongo.url);
var users = db.get('users', {strict: true});

exports.signIn = function *() {
  var ctx = this;
  console.log("arrived at login");
  yield* passport.authenticate("local", function*(err, user, info) {
    if (err) {
      throw err;
    }
    if (user === false) {
      ctx.status = 401;
    } else {
      yield ctx.login(user);
      ctx.body = { user: user };
    }
  }).call(this);
};

exports.checkAuth = function *() {
  if (this.passport.user) {
    this.body = {user: this.passport.user};
    this.status = 200;
  } else{
    this.status = 401;
  }
};

exports.signOut = function *() {
  this.logout();
  this.session = null;
  this.status = 204;
};

exports.createUser = function *() {
  var body = yield this.request.body;

  if (!body) {
    this.throw("The body is empty", 400);
  }

  if (!body.username) {
    this.throw("Missing username", 400);
  }
  if (!body.password) {
    this.throw("Missing password", 400);
  }

  try {
    var user = new User(body);

    var existingClient = yield users.findOne({ 'email': user.emailAddress });
    if(existingClient){
        this.status = 400;
        this.body ='User with email: '+user.emailAddress+' already exists.';
        return;
    }
    var _event = {
      contact: {  firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phone: user.phone,
        secondaryPhone: user.secondaryPhone
      },
      source: user.source,
      sourceNotes: user.sourceNotes,
      startDate: user.startDate
    };
    this.body = yield ges(_event,"HireNewTrainer");

    yield this.login(user);
  } catch (err) {
    this.throw(err);
  }

  this.status = 200;
  this.body = { user: this.passport.user };
};
