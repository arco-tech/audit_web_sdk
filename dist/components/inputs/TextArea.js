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
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArea = void 0;
var m = require("mithril");
exports.TextArea = {
    view: function (_a) {
        var _b = _a.attrs, selector = _b.selector, changeset = _b.changeset, name = _b.name, _c = _b.rows, rows = _c === void 0 ? 10 : _c, attrs = __rest(_b, ["selector", "changeset", "name", "rows"]);
        return m("textarea" + (selector || ""), __assign({ value: changeset.getValue(name), oninput: function (event) {
                changeset.change(name, event.target.value);
            }, rows: rows }, attrs));
    },
};
//# sourceMappingURL=TextArea.js.map