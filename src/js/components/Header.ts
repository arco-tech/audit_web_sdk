import * as m from "mithril";

interface Attrs {}

type Vnode = m.Vnode<Attrs>;

export const Header: m.Component<Attrs> = {
  view: (vnode: Vnode) => {
    return m(".header", [
      m("a", {
        href: "https://prod.businesslinkpacific.com",
        target: "_blank",
      }, [
        m("img.header__logo", {
          src: "/images/blp-logo-white.svg",
        }),
      ]),
    ]);
  },
};
