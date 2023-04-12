"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var m = require("mithril");
var BEM_1 = require("../BEM");
exports.Button = {
    view: function (_a) {
        var _b = _a.attrs, _c = _b.selector, selector = _c === void 0 ? "" : _c, _d = _b.modifiers, modifiers = _d === void 0 ? [] : _d, onClick = _b.onClick, children = _a.children;
        return m(selector + (0, BEM_1.block)("button", modifiers), {
            onclick: function () {
                if (onClick) {
                    onClick();
                }
            },
        }, children);
    },
};
//# sourceMappingURL=Button.js.map