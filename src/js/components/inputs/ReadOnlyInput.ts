import * as m from "mithril";
import {Changeset} from "../../Changeset.js";

interface Attrs {
  changeset: Changeset;
  name: string;
}

type Vnode = m.Vnode<Attrs>;

export const ReadOnlyInput: m.Component<Attrs> = {
  view: ({attrs: {changeset, name}}) => {
    return m(".input", changeset.getValue(name));
  },
};
