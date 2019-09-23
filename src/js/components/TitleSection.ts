import * as m from "mithril";
import {Section} from "../components";

interface Attrs {
  title?: string;
  subtitle?: string;
  contentModifiers: string | string[];
}

type Vnode = m.Vnode<Attrs>;

export const TitleSection: m.Component<Attrs> = {
  view: (vnode: Vnode) => {
    const {title, subtitle, modifiers, contentModifiers} = vnode.attrs;
    return m(Section, {
      modifiers: modifiers,
      contentModifiers: contentModifiers || "small",
    }, [
      m(".align-center.padding-top-large", [
        m("img", {
          src: "/images/icons/form.svg",
          style: "max-width: 120px",
        }),
        m("h1.weight-bold.margin-bottom-none", [
          title || "Professional Competency Portfolio",
        ]),
        subtitle && m("p.margin-y-small", subtitle),
        vnode.children,
      ]),
    ]);
  },
};
