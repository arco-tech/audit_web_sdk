"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
exports.ProgressBar = {
    oninit: function (_a) {
        var state = _a.state;
        state.initialising = true;
        setTimeout(function () {
            state.initialising = false;
            m.redraw();
        }, 50);
    },
    view: function (_a) {
        var _b = _a.attrs, progress = _b.progress, color = _b.color, initialising = _a.state.initialising;
        if (progress < 0) {
            progress = 0;
        }
        if (progress > 100) {
            progress = 100;
        }
        return m(".progress-bar" + (color ? ".bg-" + color : ""), [
            m(".progress-bar__progress", { style: "width: " + progress + "%" }),
        ]);
    },
};
//# sourceMappingURL=ProgressBar.js.map