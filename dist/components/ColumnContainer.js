import m from "mithril";
import { block } from "../BEM.js";
export const ColumnContainer = {
    view: ({ attrs: { selector = "", modifiers = [], ...attrs }, children }) => {
        return m(selector + block("column-container", modifiers), attrs, children);
    },
};
//# sourceMappingURL=ColumnContainer.js.map