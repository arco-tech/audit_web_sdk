import * as m from "mithril";
import { block } from "../../BEM.js";
export const SectionSelector = {
    view: ({ attrs: { sections, changeset } }) => {
        return sections.map((section) => {
            const active = changeset.getValue(section.id()) || false;
            return m(".icon-selector", {
                onclick: () => {
                    changeset.change(section.id(), active ? false : true);
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
//# sourceMappingURL=SectionSelector.js.map