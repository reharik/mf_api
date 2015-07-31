/**
 * Created by rharik on 6/23/15.
 */
var container = require('dagon');
console.log(__dirname);
module.exports =  new container(x=>
    x.pathToRoot(__dirname)
        .requireDirectoryRecursively('./src')
        .for('gesConnection').instantiate(x=>x.initializeWithMethod('openConnection'))
        .rename('lodash').withThis('_')
        .rename('bluebird').withThis('Promise')
        .complete());
