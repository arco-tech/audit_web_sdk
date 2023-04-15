import * as m from "mithril";
import { block } from "../BEM.js";
export const Section = {
    view: ({ attrs: { selector = "", contentModifiers = [], modifiers = [] }, children }) => {
        return m(selector + block("section", modifiers), [
            m(block("section__content", contentModifiers), children),
        ]);
    },
};
//# sourceMappingURL=Section.js.map