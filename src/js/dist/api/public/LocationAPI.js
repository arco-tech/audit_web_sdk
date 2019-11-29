"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("../../Location");
var API_1 = require("./API");
function locations() {
    return API_1.request("get", "locations")
        .then(function (locationsJSON) {
        return locationsJSON.map(function (locationJSON) {
            return new Location_1.Location(locationJSON);
        });
    });
}
exports.locations = locations;
//# sourceMappingURL=LocationAPI.js.map