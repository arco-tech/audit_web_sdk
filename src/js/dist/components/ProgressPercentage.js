"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var BEM_1 = require("../BEM");
exports.ProgressPercentage = {
    oninit: function (vnode) {
        vnode.state.display = 0;
    },
    onbeforeremove: function (vnode) {
        clearTimeout(vnode.state.timeout);
    },
    view: function (vnode) {
        updateState(vnode);
        var complete = vnode.state.display === 100;
        var modifiers = complete ? ["complete"] : [];
        var color = vnode.attrs.color || (complete ? "primary" : "grey");
        var selector = (vnode.attrs.selector || "") +
            (".color-" + color) +
            BEM_1.block(".progress-percentage", modifiers);
        return m(selector, Math.round(vnode.state.display) + "%");
    },
};
function updateState(vnode) {
    var progress = vnode.attrs.progress, _a = vnode.state, display = _a.display, timeout = _a.timeout;
    var difference = Math.abs(progress - display);
    clearTimeout(timeout);
    if (difference >= 1) {
        var change = difference * 0.2;
        if (display > progress) {
            change = -change;
        }
        vnode.state.display += change;
        if (difference !== 0) {
            vnode.state.timeout = setTimeout(function () {
                updateState(vnode);
                m.redraw();
            }, 40);
        }
    }
    else {
        vnode.state.display = progress;
    }
}
//# sourceMappingURL=ProgressPercentage.js.map