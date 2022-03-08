"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var BEM_1 = require("../../BEM");
exports.CheckBoxList = {
    view: function (_a) {
        var _b = _a.attrs, name = _b.name, changeset = _b.changeset, options = _b.options;
        var selected = Array.isArray(changeset.getValue(name)) ? changeset.getValue(name) : [];
        return options.map(function (_a) {
            var label = _a.label, value = _a.value;
            var active = selected.indexOf(value) !== -1;
            return m(".check-box", {
                onclick: function () {
                    if (active) {
                        changeset.change(name, selected.filter(function (v) { return v !== value; }));
                    }
                    else {
                        changeset.change(name, __spreadArrays(selected, [value]));
                    }
                },
            }, [
                m(BEM_1.block("check-box__tick-box", active ? ["active"] : [])),
                m(BEM_1.block("check-box__text", active ? ["active"] : []), label),
            ]);
        });
    },
};
//# sourceMappingURL=CheckBoxList.js.map