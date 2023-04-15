import * as m from "mithril";
export const TextArea = {
    view: ({ attrs: { selector, changeset, name, rows = 10, ...attrs } }) => {
        return m("textarea" + (selector || ""), {
            value: changeset.getValue(name),
            oninput: (event) => {
                changeset.change(name, event.target.value);
            },
            rows: rows,
            ...attrs,
        });
    },
};
//# sourceMappingURL=TextArea.js.map