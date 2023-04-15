import * as m from "mithril";
import {block} from "../BEM.js";

type Modifier = (
  "align-center" |
  "extra-small-cut-off" |
  "small-cut-off" |
  "medium-cut-off" |
  "large-cut-off" |
  "extra-cut-off"
);

interface Attrs {
  selector?: string;
  modifiers?: Modifier[];
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const ColumnContainer: m.Component<Attrs> = {
  view: ({attrs: {selector= "", modifiers= [], ...attrs}, children}: Vnode) => {
    return m(selector + block("column-container", modifiers), attrs, children);
  },
};
