"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalLine = void 0;
var m = require("mithril");
exports.HorizontalLine = {
    view: function (vnode) {
        var lineColor = vnode.attrs.lineColor || "light-grey";
        if (Array.isArray(vnode.children) && vnode.children.length === 0) {
            return m(".horizontal-line.bg-".concat(lineColor).concat(vnode.attrs.selector || ""));
        }
        else {
            return m(".flex.flex--row.flex--center" + (vnode.attrs.selector || ""), [
                m(".horizontal-line.bg-".concat(lineColor, ".flex__1")),
                m(".padding-x-medium", vnode.children),
                m(".horizontal-line.bg-".concat(lineColor, ".flex__1")),
            ]);
        }
    },
};
//# sourceMappingURL=HorizontalLine.js.map