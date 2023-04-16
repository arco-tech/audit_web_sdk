import m from "mithril";
export const Input = {
    view: ({ attrs: { selector, changeset, name, ...attrs } }) => {
        return m("input" + (selector || ""), {
            value: changeset.getValue(name),
            oninput: (event) => {
                changeset.change(name, event.target.value);
            },
            ...attrs,
        });
    },
};
//# sourceMappingURL=Input.js.map