/**
 * Created by reharik on 7/26/15.
 */

var Hosts = require('hosts-parser').Hosts;
var hosts = new Hosts(fs.readFileSync('/etc/hosts', 'utf8'));
var config = require('config');

module.exports = function() {

    var cdn = hosts._origin.filter(function (i) {
        return i.hostname === 'cdn'
    });

    if (cdn.length > 0) {
        config.cdn.ip = cdn[0].ip;
        console.log("CDN IP: " + cdn[0].ip);
    }
};
