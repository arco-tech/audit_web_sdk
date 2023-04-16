import m from "mithril";

interface Attrs {
  selector?: string;
  lineColor?: string;
}

type Vnode = m.Vnode<Attrs>;

export const HorizontalLine: m.Component<Attrs> = {
  view: (vnode: Vnode) => {
    const lineColor = vnode.attrs.lineColor || "light-grey";
    if (Array.isArray(vnode.children) && vnode.children.length === 0) {
      return m(`.horizontal-line.bg-${lineColor}${vnode.attrs.selector || ""}`);
    } else {
      return m(".flex.flex--row.flex--center" + (vnode.attrs.selector || ""), [
        m(`.horizontal-line.bg-${lineColor}.flex__1`),
        m(".padding-x-medium", vnode.children),
        m(`.horizontal-line.bg-${lineColor}.flex__1`),
      ]);
    }
  },
};
