/**
 * Created by parallels on 7/27/15.
 */

var _container = require('dagon');
module.exports = new _container(x=>
    x.pathToRoot(__dirname)
        .requireDirectoryRecursively('./src')
        .for('gesConnection').instantiate(x=>x.initializeWithMethod('openConnection'))
        .rename('lodash').withThis('_')
        .rename('bluebird').withThis('Promise')
        .complete());