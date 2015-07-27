/**
 * Created by reharik on 7/26/15.
 */

module.exports = function(config) {
    return {
        index: function *() {
            this.body = yield this.render("basic", {
                version: "1",
                commit: "1",
                cdn: config.cdn.ip
            });
        };
    };
};