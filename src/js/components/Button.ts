import m from "mithril";
import {block} from "../BEM.js";

type Modifier = "wide" | "inverse-primary";

interface Attrs {
  selector?: string;
  modifiers?: Modifier | Modifier[];
  onClick?: () => void;
}

type Vnode = m.Vnode<Attrs>;

export const Button: m.Component<Attrs> = {
  view: ({attrs: {selector= "", modifiers= [], onClick}, children}: Vnode) => {
    return m(selector + block("button", modifiers), {
      onclick: () => {
        if (onClick) { onClick(); }
      },
    }, children);
  },
};
