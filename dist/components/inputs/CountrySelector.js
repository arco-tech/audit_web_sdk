import * as m from "mithril";
import * as LocationAPI from "../../api/public/LocationAPI.js";
import { Selector } from "./Selector.js";
export const CountrySelector = {
    oninit: (vnode) => {
        vnode.state.locations = [];
        return LocationAPI.locations().then((locations) => {
            vnode.state.locations = locations;
        });
    },
    view: ({ attrs: { name, changeset }, state: { locations } }) => {
        return m(Selector, {
            name,
            changeset,
            integerValues: true,
            options: defaultOptions().concat(locations.map((location) => {
                return { label: location.name(), value: location.id() };
            })),
        });
    },
};
function defaultOptions() {
    return [{ label: "Select a country...", value: null }];
}
//# sourceMappingURL=CountrySelector.js.map