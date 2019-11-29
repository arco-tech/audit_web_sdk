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
exports.DateRangeInput = {
    view: function (_a) {
        var _b = _a.attrs, name = _b.name, changeset = _b.changeset, attrs = __rest(_b, ["name", "changeset"]);
        var value = changeset.getValue(name) || {};
        if (!value.from) {
            value.from = new Date().toISOString().substring(0, 10);
        }
        if (!value.to) {
            value.to = new Date().toISOString().substring(0, 10);
        }
        return [
            m("input", __assign({ type: "date", value: value.from, oninput: function (event) {
                    var fromDate = new Date(event.target.value);
                    if (!isNaN(fromDate.getTime())) {
                        changeset.change(name, {
                            from: fromDate.toISOString().substring(0, 10),
                            to: value.to,
                        });
                    }
                } }, attrs)),
            m(".align-center.color-grey", "to"),
            m("input", __assign({ type: "date", value: value.to, oninput: function (event) {
                    var toDate = new Date(event.target.value);
                    if (!isNaN(toDate.getTime())) {
                        changeset.change(name, {
                            from: value.from,
                            to: toDate.toISOString().substring(0, 10),
                        });
                    }
                } }, attrs)),
        ];
    },
};
//# sourceMappingURL=DateRangeInput.js.map