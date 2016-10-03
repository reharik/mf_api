/**
 * Created by reharik on 7/26/15.
 */
"use strict";

module.exports = function(messagebinders){

    var  signIn = function (ctx) {
        console.log("arrived at login");
        console.log('==========ctx=========');
        console.log(ctx);
        console.log('==========END ctx=========');
        return ctx;
    };

//
//         const x= koapassport.authenticate('local', function(user, info, status) {
//            console.log('=========="authCallback=========');
//            console.log("authCallback");
//            console.log('==========END "authCallback=========');
//             if (!user) {
//                 ctx.status = 401;
//                 ctx.body = { success: false }
//             } else {
//                 ctx.body = {success: true};
//                 var cmd = messagebinders.commands.loginTrainerCommand(user.id, user.userName);
//                 messagebinders.commandPoster(cmd, 'loginTrainer');
//                 return ctx.login(user);
//             }
//         });
//
// console.log('==========x=========');
// console.log(x.toString());
// console.log('==========END x=========');
// const y = x((ctx, next));
// console.log('==========y=========');
// console.log(y);
// console.log('==========END y=========');
//         y.then(z=> {
//               console.log('==========z=========');
//               console.log(z);
//               console.log('==========END z=========');
//               return z;
        // return koapassport.authenticate("local", function(err, user, info, status) {
        //     console.log('==========user --- in authenticate=========');
        //     console.log(user);
        //     console.log('==========END user=========');
        //     if (!user) {
        //         ctx.status = 401
        //         return ctx.body = {success: false}
        //     }
        //     ctx.body = {success: true}
        //     var cmd = messagebinders.commands.loginTrainerCommand(user.id, user.userName);
        //     console.log('=========="here2"=========');
        //     console.log("here2");
        //     console.log('==========END "here2"=========');
        //     messagebinders.commandPoster(cmd, 'loginTrainer');
        //     console.log('=========="here"=========');
        //     console.log("here");
        //     console.log('==========END "here"=========');
        //     return ctx.login(user)
        // })(ctx, next)


       // var x = await authentication.authenticate(ctx, next);
    //
    // };

    var  checkAuth = async function () {
        if (this.passport.user) {
            this.body = {user: this.passport.user};
            this.status = 200;
        } else{
            this.status = 401;
        }
    };

    var  signOut = async function () {
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

