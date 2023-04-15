import * as m from "mithril";
import {block} from "../BEM.js";

type Modifier = "padding-small";

type ContentModifier =
  "extra-small" | "small" | "medium" | "large" | "extra-large";

interface Attrs {
  selector?: string;
  modifiers?: Modifier | Modifier[];
  contentModifiers?: ContentModifier | ContentModifier[];
}

type Vnode = m.Vnode<Attrs>;

export const Section: m.Component<Attrs> = {
  view: (
    {attrs: {selector="", contentModifiers=[], modifiers=[]}, children}: Vnode,
  ) => {
    return m(selector + block("section", modifiers), [
      m(block("section__content", contentModifiers), children),
    ]);
  },
};
