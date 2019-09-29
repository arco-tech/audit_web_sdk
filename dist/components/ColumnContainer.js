"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var BEM_1 = require("../BEM");
exports.ColumnContainer = {
    view: function (_a) {
        var _b = _a.attrs, _c = _b.selector, selector = _c === void 0 ? "" : _c, _d = _b.modifiers, modifiers = _d === void 0 ? [] : _d, attrs = __rest(_b, ["selector", "modifiers"]), children = _a.children;
        return m(selector + BEM_1.block("column-container", modifiers), attrs, children);
    },
};
//# sourceMappingURL=ColumnContainer.js.map