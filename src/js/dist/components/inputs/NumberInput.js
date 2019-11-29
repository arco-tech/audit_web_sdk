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
var BEM_1 = require("../../BEM");
exports.NumberInput = {
    view: function (_a) {
        var _b = _a.attrs, changeset = _b.changeset, name = _b.name, attrs = __rest(_b, ["changeset", "name"]);
        return m(".input-wrapper", [
            m("input.input-wrapper__input", __assign({ value: changeset.getValue(name), type: "number", onkeypress: checkInput, oninput: function (event) {
                    var value = event.target.value;
                    var numberValue = value ? parseFloat(value) : null;
                    changeset.change(name, numberValue);
                } }, attrs)),
            m(BEM_1.block("input-wrapper__icon", ["split"]), [
                m(BEM_1.block("input-wrapper__icon__split", ["up-arrow"]), {
                    onclick: function () {
                        var value = changeset.getValue(name) || 0;
                        changeset.change(name, Math.round(value + 1));
                    },
                }),
                m(BEM_1.block("input-wrapper__icon__split", ["down-arrow"]), {
                    onclick: function () {
                        var value = changeset.getValue(name) || 0;
                        changeset.change(name, Math.round(value - 1));
                    },
                }),
            ]),
        ]);
    },
};
function checkInput(event) {
    if (".0123456789".split("").indexOf(event.key) === -1) {
        event.preventDefault();
    }
}
//# sourceMappingURL=NumberInput.js.map