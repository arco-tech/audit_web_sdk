import m from "mithril";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
export const Screen = {
    oncreate: (vnode) => {
        window.scrollTo(0, 0);
    },
    view: (vnode) => {
        return m(".screen" + (vnode.attrs.selector || ""), [
            m(vnode.attrs.headerComponent || Header),
            m(".screen__content", vnode.children),
            m(vnode.attrs.footerComponent || Footer),
        ]);
    },
};
//# sourceMappingURL=Screen.js.map