/**
 * Created by reharik on 7/26/15.
 */

module.exports = function(hostsparser, config, fs) {
    return function () {
        var hosts = new hostsparser.Hosts(fs.readFileSync('/etc/hosts', 'utf8'));
        var frontend = hosts._origin.filter(function (i) {
            return i.hostname === 'frontend'
        });

        if (frontend.length > 0) {
            config.frontend.ip = frontend[0].ip;
            console.log("frontend IP: " + frontend[0].ip);
        }

        //var eventstore = hosts._origin.filter(function (i) {
        //    return i.hostname === 'eventstore'
        //});
        //
        //if (eventstore.length > 0) {
        //    config.eventstore.ip = eventstore[0].ip;
        //    console.log("eventstore IP: " + eventstore[0].ip);
        //}
    };
};