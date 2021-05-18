"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PublicForm = /** @class */ (function () {
    function PublicForm(data) {
        this._data = data;
    }
    PublicForm.prototype.data = function () {
        return this._data;
    };
    PublicForm.prototype.namedId = function () {
        return this._data.named_id;
    };
    PublicForm.prototype.color = function () {
        return this._data.colour_code;
    };
    PublicForm.prototype.description = function () {
        return this._data.description;
    };
    PublicForm.prototype.uiType = function () {
        return this._data.ui_type;
    };
    PublicForm.prototype.name = function () {
        return this._data.name;
    };
    return PublicForm;
}());
exports.PublicForm = PublicForm;
//# sourceMappingURL=PublicForm.js.map