"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
exports.ProgressBar = {
    view: function (_a) {
        var progress = _a.attrs.progress;
        if (progress < 0) {
            progress = 0;
        }
        if (progress > 100) {
            progress = 100;
        }
        return m(".progress-bar", [
            m(".progress-bar__progress", { style: "width: " + progress + "%" }),
        ]);
    },
};
//# sourceMappingURL=ProgressBar.js.map