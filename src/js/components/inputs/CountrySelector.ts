import * as m from "mithril";
import {LocationAPI} from "../../api";
import {Changeset} from "../../Changeset";
import {Location} from "../../Location";
import {Option, Selector} from "./Selector";

interface Attrs {
  name: string;
  changeset: Changeset;
}

interface State {
  locations: Location[];
}

type Vnode = m.Vnode<Attrs>;

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
