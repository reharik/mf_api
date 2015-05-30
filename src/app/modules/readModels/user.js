

'use strict';

class User{
    constructor(userProperties) {
        try {
            this._firstName = userProperties ? userProperties.firstName : "";
            this._lastName = userProperties ? userProperties.lastName : "";
            this._emailAddress = userProperties ? userProperties.emailAddress : "";
            this._password = userProperties ? userProperties.password : "";
            this._phone = userProperties ? userProperties.phone : "";
            this._secondaryPhone = userProperties ? userProperties.secondaryPhone : "";
            this._source = userProperties ? userProperties.source : "";
            this._sourceNotes = userProperties ? userProperties.sourceNotes: "";
            this._startDate = userProperties ? userProperties.startDate : "";
        }catch(error){
            throw("Must provide all properties to create a user");
        }
    }
    firstName() { return this._firstName; }
    lastName() { return this._lastName; }
    email() { return this._emailAddress; }
    phone() { return this._phone; }
    secondaryPhone() { return this._secondaryPhone; }
    _source() { return this._source; }
    _sourceNotes() { return this._sourceNotes; }
    startDate() { return this._startDate ; }
};

module.exports = User;