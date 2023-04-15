import * as m from "mithril";
export const ReadOnlyInput = {
    view: ({ attrs: { changeset, name } }) => {
        return m(".input", changeset.getValue(name));
    },
};
//# sourceMappingURL=ReadOnlyInput.js.map