import * as m from "mithril";
import {block} from "../BEM";
import {Footer} from "./Footer";
import {Header} from "./Header";

interface Attrs {
  selector?: string;
  modifiers?: string | string[];
}

type Vnode = m.Vnode<Attrs>;

export const Screen: m.Component<Attrs> = {
  oncreate: (vnode: Vnode) => {
    window.scrollTo(0, 0);
  },

  view: (vnode: Vnode) => {
    const selector = vnode.attrs.selector || "";
    return m(block("screen", vnode.attrs.modifiers || []) + selector, [
      m(Header),
      m(".screen__content", vnode.children),
      m(Footer),
    ]);
  },
};
