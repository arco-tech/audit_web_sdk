import m from "mithril";
export const Column = {
    view: ({ attrs: { selector = "", flex, ...attrs }, children }) => {
        return m(selector + ".column", {
            style: flex ? `flex: ${flex};` : "",
            ...attrs,
        }, children);
    },
};
//# sourceMappingURL=Column.js.map