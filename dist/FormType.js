"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormType = /** @class */ (function () {
    function FormType(data) {
        this._data = data;
    }
    FormType.prototype.named_id = function () {
        return this._data.named_id;
    };
    FormType.prototype.name = function () {
        return this._data.name;
    };
    FormType.prototype.description = function () {
        return this._data.description;
    };
    return FormType;
}());
exports.FormType = FormType;
//# sourceMappingURL=FormType.js.map