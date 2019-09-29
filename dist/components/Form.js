"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var ErrorMessage_1 = require("./ErrorMessage");
exports.Form = {
    view: function (_a) {
        var _b = _a.attrs, changeset = _b.changeset, onSubmit = _b.onSubmit, children = _a.children;
        return m("form", {
            onsubmit: function (event) {
                event.preventDefault();
                if (onSubmit) {
                    onSubmit(changeset);
                }
            },
        }, [
            changeset.getResponseError && m(".margin-bottom-medium", [
                m(ErrorMessage_1.ErrorMessage, { error: changeset.getResponseError() }),
            ]),
            children,
            m("input.hide", { name: "submit", type: "submit" }),
        ]);
    },
};
//# sourceMappingURL=Form.js.map