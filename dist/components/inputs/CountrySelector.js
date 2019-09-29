"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var LocationAPI = require("../../api/public/LocationAPI");
var Selector_1 = require("./Selector");
exports.CountrySelector = {
    oninit: function (vnode) {
        vnode.state.locations = [];
        return LocationAPI.locations().then(function (locations) {
            vnode.state.locations = locations;
        });
    },
    view: function (_a) {
        var _b = _a.attrs, name = _b.name, changeset = _b.changeset, locations = _a.state.locations;
        return m(Selector_1.Selector, {
            name: name,
            changeset: changeset,
            integerValues: true,
            options: defaultOptions().concat(locations.map(function (location) {
                return { label: location.name(), value: location.id() };
            })),
        });
    },
};
function defaultOptions() {
    return [{ label: "Select a country...", value: null }];
}
//# sourceMappingURL=CountrySelector.js.map