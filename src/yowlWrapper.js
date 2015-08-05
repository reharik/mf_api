/**
 * Created by parallels on 8/4/15.
 */

module.exports = function(yowl,config){
    return function(){
        var _yowl = new yowl({
            system : {
                applicationName : "MF_Api",
                environment :config.get('env')
            }
        });
        _yowl.addConsoleSink({
            level : "silly",
            colorize : true
        }).info("added Console Sink")
            .addDailyRotateFileSink({
                level : "info",
                filename : "/MF_Api.log"
            })
            .info("added Daily RotateFile Sink");
        return _yowl;
    }
};
