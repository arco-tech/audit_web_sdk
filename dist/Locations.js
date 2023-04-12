"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locations = exports.locationByCode = exports.location = void 0;
var LocationAPI = require("./api/public/LocationAPI");
var state = {
    locations: null,
    promise: null,
};
function location(id) {
    return locations().find(function (l) { return l.id() === id; });
}
exports.location = location;
function locationByCode(countryCode) {
    return locations().find(function (l) { return l.countryCode() === countryCode; });
}
exports.locationByCode = locationByCode;
function locations() {
    if (state.locations !== null) {
        return state.locations;
    }
    else {
        if (state.promise === null) {
            load();
        }
        return [];
    }
}
exports.locations = locations;
function load() {
    state.promise =
        LocationAPI.locations()
            .then(function (results) {
            state.locations = results;
            state.promise = null;
        })
            .catch(function () { state.promise = null; });
}
//# sourceMappingURL=Locations.js.map