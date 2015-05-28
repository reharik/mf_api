var passport = require("koa-passport"),
    User = require("mongoose").model("User");

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


    var existingClient = User.findOne({ 'email': user.email }).exec();
    if(existingClient){
        this.status = 400;
        this.body ='User with email: '+user.email+' already exists.';
        return;
    }

    user = yield user.save();
    yield this.login(user);
  } catch (err) {
    this.throw(err);
  }

  this.status = 200;
  this.body = { user: this.passport.user };
};
