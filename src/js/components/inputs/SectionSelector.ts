import m from "mithril";
import {Changeset} from "../../Changeset.js";
import {PublishedFormSection} from "../../PublishedForm.js";
import {block} from "../../BEM.js";

interface Attrs {
  sections: PublishedFormSection[];
  changeset: Changeset;
}

type Vnode = m.Vnode<Attrs>;

export const SectionSelector: m.Component<Attrs> = {
  view: ({attrs: {sections, changeset}}: Vnode) => {
    return sections.map((section: PublishedFormSection) => {
      const active = changeset.getValue(String(section.id())) || false;
      return m(".icon-selector", {
        onclick: () => {
          changeset.change(String(section.id()), active ? false : true);
        },
      }, [
        m(block("icon-selector__icon", active ? "active" : []), {
          style: `background-image: url("${section.iconURL()}")`,
        }),
        m(".icon-selector__label", section.name()),
      ]);
    });
  },
};
