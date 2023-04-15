import { Location } from "../../Location.js";
import { request } from "./API.js";
export function locations() {
    return request("get", "locations")
        .then((locationsJSON) => {
        return locationsJSON.map((locationJSON) => {
            return new Location(locationJSON);
        });
    });
}
//# sourceMappingURL=LocationAPI.js.map