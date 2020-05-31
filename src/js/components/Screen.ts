import * as m from "mithril";
import {block} from "../BEM";
import {Footer} from "./Footer";
import {Header} from "./Header";

interface Attrs {
  selector?: string;
  headerComponent: any;
  footerComponent: any;
}

type Vnode = m.Vnode<Attrs>;

export const Screen: m.Component<Attrs> = {
  oncreate: (vnode: Vnode) => {
    window.scrollTo(0, 0);
  },

  view: (vnode: Vnode) => {
    return m(".screen" + (vnode.attrs.selector || ""), [
      m(vnode.attrs.headerComponent || Header),
      m(".screen__content", vnode.children),
      m(vnode.attrs.footerComponent || Footer),
    ]);
  },
};
