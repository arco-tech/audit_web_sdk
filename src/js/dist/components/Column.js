"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
exports.Column = {
    view: function (_a) {
        var _b = _a.attrs, _c = _b.selector, selector = _c === void 0 ? "" : _c, flex = _b.flex, attrs = __rest(_b, ["selector", "flex"]), children = _a.children;
        return m(selector + ".column", __assign({ style: flex ? "flex: " + flex + ";" : "" }, attrs), children);
    },
};
//# sourceMappingURL=Column.js.map