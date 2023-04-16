import m from "mithril";
import * as LocationAPI from "../../api/public/LocationAPI.js";
import {Changeset} from "../../Changeset.js";
import {Location} from "../../Location.js";
import {Option, Selector} from "./Selector.js";

interface Attrs {
  name: string;
  changeset: Changeset;
}

interface State {
  locations: Location[];
}

type Vnode = m.Vnode<Attrs, State>;

export const CountrySelector: m.Component<Attrs> = {
  oninit: (vnode: Vnode) => {
    vnode.state.locations = [];
    return LocationAPI.locations().then((locations: Location[]) => {
      vnode.state.locations = locations;
    });
  },

  view: ({attrs: {name, changeset}, state: {locations}}: Vnode) => {
    return m(Selector, {
      name,
      changeset,
      integerValues: true,
      options: defaultOptions().concat(locations.map((location: Location) => {
        return {label: location.name(), value: location.id()};
      })),
    });
  },
};

function defaultOptions(): Option[] {
  return [{label: "Select a country...", value: null}];
}
