"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
exports.FileUploadInput = {
    view: function (_a) {
        var _b = _a.attrs, selector = _b.selector, changeset = _b.changeset, name = _b.name, state = _a.state;
        return m("input", {
            type: "file",
            multiple: true,
            value: changeset.getValue(name),
            oninput: function (event) {
                // changeset.change(name, event.target.value);
            },
        });
    },
};
//# sourceMappingURL=FileUploadInput.js.map