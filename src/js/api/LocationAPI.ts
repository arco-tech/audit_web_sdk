import {Location, LocationJSON} from "../Location";
import {request} from "./API";

export function locations(): Promise<Location[]> {
  return request<LocationJSON[]>("get", "locations")
    .then((locationsJSON: LocationJSON[]) => {
      return locationsJSON.map((locationJSON: LocationJSON) => {
        return new Location(locationJSON);
      });
    });
}
