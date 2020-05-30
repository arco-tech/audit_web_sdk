"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Industry = /** @class */ (function () {
    function Industry(data) {
        this._data = data;
    }
    Industry.prototype.id = function () {
        return this._data.id;
    };
    Industry.prototype.namedID = function () {
        return this._data.named_id;
    };
    Industry.prototype.name = function () {
        return this._data.name;
    };
    return Industry;
}());
exports.Industry = Industry;
//# sourceMappingURL=Industry.js.map