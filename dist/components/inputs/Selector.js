"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
var m = require("mithril");
var BEM_1 = require("../../BEM");
exports.Selector = {
    view: function (vnode) {
        var _a = vnode.attrs, name = _a.name, changeset = _a.changeset, options = _a.options, integerValues = _a.integerValues, objectValues = _a.objectValues;
        var value = changeset.getValue(name);
        return m(".input-wrapper.cursor-pointer", [
            m("select.input-wrapper__input", {
                required: true,
                value: value === null ? "" :
                    objectValues ? JSON.stringify(value) : "".concat(value),
                onchange: function (event) {
                    var changeValue = event.target.value;
                    if (changeValue === "") {
                        changeset.change(name, null);
                    }
                    else if (objectValues) {
                        changeset.change(name, JSON.parse(changeValue));
                    }
                    else if (integerValues) {
                        changeset.change(name, parseInt(changeValue) || null);
                    }
                    else {
                        changeset.change(name, changeValue);
                    }
                },
            }, [
                vnode.attrs.hasOwnProperty("nullLabel") &&
                    m("option", { value: "" }, vnode.attrs.nullLabel),
                options.map(function (option) {
                    return m("option", {
                        value: objectValues ? JSON.stringify(option.value) : "".concat(option.value),
                    }, option.label);
                }),
            ]),
            m((0, BEM_1.block)("input-wrapper__icon", ["arrow-icon", "click-through"])),
        ]);
    },
};
//# sourceMappingURL=Selector.js.map