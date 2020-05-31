"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormType_1 = require("../../FormType");
var API_1 = require("./API");
function formType(id) {
    return API_1.request("get", "form-types/" + id)
        .then(function (formTypeJSON) { return new FormType_1.FormType(formTypeJSON); });
}
exports.formType = formType;
//# sourceMappingURL=FormTypeAPI.js.map