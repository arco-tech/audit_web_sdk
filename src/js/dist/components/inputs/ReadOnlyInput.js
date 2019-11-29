"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
exports.ReadOnlyInput = {
    view: function (_a) {
        var _b = _a.attrs, changeset = _b.changeset, name = _b.name;
        return m(".input", changeset.getValue(name));
    },
};
//# sourceMappingURL=ReadOnlyInput.js.map