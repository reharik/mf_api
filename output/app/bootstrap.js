/**
 * Created by parallels on 7/27/15.
 */

'use strict';

var _container = require('dagon');
module.exports = new _container(function (x) {
    return x.pathToRoot(__dirname).requireDirectoryRecursively('./src')['for']('gesConnection').instantiate(function (x) {
        return x.initializeWithMethod('openConnection');
    }).rename('lodash').withThis('_').rename('bluebird').withThis('Promise').complete();
});