/**
 * Created by reharik on 7/26/15.
 */
"use strict";

module.exports = function(config) {
    return {
        index: async function () {
            this.body = await this.render("basic", {
                version: "1",
                commit: "1",
                //frontend: config.frontend.ip,
                sitename: config.app.title
            });
        }
    };
};