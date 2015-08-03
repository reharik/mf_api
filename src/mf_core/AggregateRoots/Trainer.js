/**
 * Created by rharik on 7/13/15.
 */

module.exports = function(AggregateRootBase, GesEvent, uuid, invariant) {
    return class Trainer extends AggregateRootBase {
        constructor() {
            super();
            var _password;
            var _loggedIn;
            var _isArchived;
            this.type = 'Trainer';
        }
        static aggregateName() {
            return 'Trainer';
        }

        commandHandlers() {
            return {
                'hireTrainer': function (cmd) {
                    this.raiseEvent(new GesEvent('trainerHired',{credentials:cmd.credentials, contact:cmd.contact, address:cmd.address, dob:cmd.dob}));
                },
                'loginTrainer': function (cmd) {
                    expectNotLoggedIn();
                    expectCorrectPassword(cmd.password);
                    var token = createToken();
                    this.raiseEvent(new GesEvent('trainerLoggedIn',{id:this._id, userName:cmd.userName, token:token, created:new Date()}));
                },
                'archiveTrainer': function (cmd) {
                    expectNotArchived();
                    this.raiseEvent(new GesEvent('trainerArchived',{id:this._id, archivedDate:new Date()}));
                },
                'unArchiveUser': function (cmd) {
                    expectArchived();
                    this.raiseEvent(new GesEvent('trainerUnarchived',{id:this._id, unArchivedDate:new Date()}));
                }
            }
        }


        applyEventHandlers() {
            return {
                'trainerHired': function (event) {
                    this._password = event.password;
                }.bind(this),

                'userArchived': function (event) {
                    this._isArchived = true;
                }.bind(this),

                'userUnarchived': function (event) {
                    this._isArchived = false;
                }.bind(this)
            }
        }


        createToken() {
            return uuid.v4();
        }

        expectCorrectPassword(password) {
            invariant(password != this._password,
                new Error('Incorrect credentials'));
        }

        expectNotLoggedIn() {
            invariant(_loggedIn,
                new Error('Trainer already logged in'));
        }

        expectNotArchived() {
            invariant(this._isArchived,
                new Error('Trainer already archived'));
        }

        expectArchived() {
            invariant(!this._isArchived,
                new Error('Trainer is not archived archived'));
        }

    }
};