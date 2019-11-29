"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var Grammar_1 = require("../Grammar");
exports.ErrorMessage = {
    view: function (_a) {
        var error = _a.attrs.error;
        if (error && typeof error === "string") {
            return m(".error-message", Grammar_1.sentence(error));
        }
        else if (error && Array.isArray(error)) {
            return error.map(function (errorItem) {
                if (errorItem) {
                    return m(".error-message", Grammar_1.sentence(errorItem));
                }
            });
        }
    },
};
//# sourceMappingURL=ErrorMessage.js.map