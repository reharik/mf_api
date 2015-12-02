/**
 * Created by reharik on 7/26/15.
 */

module.exports = function(messagebinders, authentication){
    var  signIn = function *() {
        console.log("arrived at login");
        yield auth = authentication.authenticate();
        if (auth.status === 401) {
            this.status = 401;
        } else {
            var cmd = messagebinders.loginTrainerCommand(auth.trainer.id, auth.trainer.credentials.userName);
            yield messagebinders.commandPoster(cmd, 'loginTrainer');
            this.body = { trainer: auth.trainer };
        }
    };

    var  checkAuth = function *() {
        if (this.passport.user) {
            this.body = {user: this.passport.user};
            this.status = 200;
        } else{
            this.status = 401;
        }
    };

    var  signOut = function *() {
        this.logout();
        this.session = null;
        this.status = 204;
    };

    return {
        signIn:signIn,
        signOut:signOut,
        checkAuth:checkAuth
    }

};

