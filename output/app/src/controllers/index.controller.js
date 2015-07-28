/**
 * Created by reharik on 7/26/15.
 */

"use strict";

module.exports = function (config) {
    return {
        index: regeneratorRuntime.mark(function index() {
            return regeneratorRuntime.wrap(function index$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return this.render("basic", {
                            version: "1",
                            commit: "1",
                            cdn: config.cdn.ip,
                            sitename: config.title
                        });

                    case 2:
                        this.body = context$2$0.sent;

                    case 3:
                    case "end":
                        return context$2$0.stop();
                }
            }, index, this);
        })
    };
};