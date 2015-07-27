/**
 * Created by reharik on 7/26/15.
 */

module.exports = function(hostsparser, config) {
    return function () {
        var hosts = new hostsparser(fs.readFileSync('/etc/hosts', 'utf8'));

        var cdn = hosts._origin.filter(function (i) {
            return i.hostname === 'cdn'
        });

        if (cdn.length > 0) {
            config.cdn.ip = cdn[0].ip;
            console.log("CDN IP: " + cdn[0].ip);
        }
    };
}