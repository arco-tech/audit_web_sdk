import * as LocationAPI from "./api/public/LocationAPI.js";
const state = {
    locations: null,
    promise: null,
};
export function location(id) {
    return locations().find((l) => l.id() === id);
}
export function locationByCode(countryCode) {
    return locations().find((l) => l.countryCode() === countryCode);
}
export function locations() {
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
function load() {
    state.promise =
        LocationAPI.locations()
            .then((results) => {
            state.locations = results;
            state.promise = null;
        })
            .catch(() => { state.promise = null; });
}
//# sourceMappingURL=Locations.js.map