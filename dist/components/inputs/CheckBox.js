"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var BEM_1 = require("../../BEM");
exports.CheckBox = {
    view: function (_a) {
        var _b = _a.attrs, name = _b.name, changeset = _b.changeset, text = _b.text, textUnselectable = _b.textUnselectable;
        var active = changeset.getValue(name);
        var change = function () { return changeset.change(name, !active); };
        return m(BEM_1.block("check-box", [textUnselectable && "no-button-transition"]), {
            onclick: !textUnselectable ? change : null,
        }, [
            m(BEM_1.block("check-box__tick-box", active ? ["active"] : []), {
                onclick: textUnselectable ? change : null,
            }),
            m(BEM_1.block("check-box__text", active ? ["active"] : []), text),
        ]);
    },
};
//# sourceMappingURL=CheckBox.js.map