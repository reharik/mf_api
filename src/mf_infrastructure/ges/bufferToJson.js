/**
 * Created by rharik on 7/7/15.
 */


module.exports = function(logger) {
    return function bufferToJson(item) {
        if(!Buffer.isBuffer(item)){
            logger.info('item is not a buffer, returning original item');
            return item;
        }
        logger.info('item is a buffer, parsing buffer');
        return JSON.parse(item.toString('utf8'));
    }
};