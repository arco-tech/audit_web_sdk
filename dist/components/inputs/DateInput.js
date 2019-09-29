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
var m = require("mithril");
exports.DateInput = {
    view: function (_a) {
        var _b = _a.attrs, name = _b.name, changeset = _b.changeset, attrs = __rest(_b, ["name", "changeset"]);
        return m("input", __assign({ type: "date", value: changeset.getValue(name), oninput: function (event) {
                var date = new Date(event.target.value);
                if (!isNaN(date.getTime())) {
                    changeset.change(name, date.toISOString().substring(0, 10));
                }
            } }, attrs));
    },
};
//# sourceMappingURL=DateInput.js.map