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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var Column_1 = require("../Column");
var ColumnContainer_1 = require("../ColumnContainer");
exports.InputList = {
    view: function (_a) {
        var _b = _a.attrs, changeset = _b.changeset, name = _b.name, attrs = __rest(_b, ["changeset", "name"]);
        var valueList = Array.isArray(changeset.getValue(name)) ? changeset.getValue(name) : [];
        if (valueList.length === 0) {
            valueList.push("");
        }
        return [
            valueList.map(function (value, index) {
                return m(ColumnContainer_1.ColumnContainer, {
                    selector: ".margin-bottom-extra-small",
                    modifiers: "align-center",
                }, [
                    m(Column_1.Column, { flex: 1 }, [
                        m("input", __assign({ value: value, oninput: function (event) {
                                var newValueList = __spreadArrays(valueList);
                                newValueList[index] = event.target.value;
                                changeset.change(name, newValueList);
                            } }, attrs)),
                    ]),
                    index !== 0 && m(Column_1.Column, {
                        selector: ".margin-x-small",
                        style: "width: 20px; height: 20px;",
                    }, [
                        m("img.cursor-pointer", {
                            src: "/images/icons/cross-circle-red.svg",
                            onclick: function () {
                                changeset.change(name, valueList.filter(function (_, i) { return i !== index; }));
                            },
                        }),
                    ]),
                ]);
            }),
            m(ColumnContainer_1.ColumnContainer, {
                selector: ".margin-top-small.cursor-pointer",
                modifiers: "align-center",
                onclick: function () {
                    changeset.change(name, __spreadArrays(valueList, [""]));
                },
            }, [
                m("img.margin-right-small", {
                    src: "/images/icons/plus-circle-grey.svg",
                    style: "width: 20px",
                }),
                m(".color-grey", { style: "flex: 1" }, "add answer"),
            ]),
        ];
    },
};
//# sourceMappingURL=InputList.js.map