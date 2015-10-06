/**
 * Created by rharik on 10/1/15.
 */

var dagon = require('dagon');

module.exports = function(_options) {
    var options = _options || {};
    var container = dagon(options.dagon);
    var result;
    try {
        result = new container(x=> x.pathToRoot(__dirname)
            .requireDirectoryRecursively('./src')
            .for('readstorerepository').instantiate(i=>i.asFunc().withParameters(options.children || {}))
            .for('eventstore').instantiate(i=>i.asFunc().withParameters(options.children || {}))
            .for('corelogger').renameTo('logger').instantiate(i=>i.asFunc().withParameters(options.logger || {}))
            .for('bluebird').renameTo('Promise')
            .complete());
    } catch (ex) {
        console.log(ex);
        console.log(ex.stack);
    }
    return result;
};
