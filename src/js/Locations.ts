import {LocationAPI} from "./api";
import {Location} from "./Location";

interface State {
  locations: Location[] | null;
  promise: Promise<Location[]> | null;
}

const state = {
  locations: null,
  promise: null,
};

export function location(id: number): Location | null {
  return locations().find((l) => l.id() === id);
}

export function locationByCode(countryCode: string): Location | null {
  return locations().find((l) => l.countryCode() === countryCode);
}

export function locations(): Location[] {
  if (state.locations !== null) {
    return state.locations;
  } else {
    if (state.promise === null) {
      load();
    }
    return [];
  }
}

function load(): void {
  state.promise =
    LocationAPI.locations()
      .then((results) => {
        state.locations = results;
        state.promise = null;
      })
      .catch(() => { state.promise = null; });
}
