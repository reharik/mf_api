/**
 * Created by reharik on 7/26/15.
 */

"use strict";

module.exports = function (bcrypt) {

    var genSalt = function genSalt(rounds, ignore) {
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(rounds, ignore, function (err, salt) {
                if (err) return reject(err);
                return resolve(salt);
            });
        });
    };

    var hash = function hash(data, salt) {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(data, salt, function (err, hash) {
                if (err) return reject(err);
                return resolve(hash);
            });
        });
    };

    var compare = function compare(data, hash) {
        return new Promise(function (resolve, reject) {
            bcrypt.compare(data, hash, function (err, matched) {
                if (err) return reject(err);
                return resolve(matched);
            });
        });
    };

    return {
        genSalt: genSalt,
        hash: hash,
        compare: compare,
        // These do not need to be promisified
        genSaltSync: bcrypt.genSaltSync,
        hashSync: bcrypt.hashSync,
        compareSync: bcrypt.compareSync,
        getRounds: bcrypt.getRounds
    };
};