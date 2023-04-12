"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
var Location = /** @class */ (function () {
    function Location(data) {
        this._data = data;
    }
    Location.prototype.id = function () {
        return this._data.id;
    };
    Location.prototype.name = function () {
        return this._data.name;
    };
    Location.prototype.countryCode = function () {
        return this._data.country_code;
    };
    Location.prototype.basnetRelatedID = function () {
        return this._data.basnet_related_id;
    };
    return Location;
}());
exports.Location = Location;
//# sourceMappingURL=Location.js.map