import * as m from "mithril";
import { block } from "../BEM.js";
export const Button = {
    view: ({ attrs: { selector = "", modifiers = [], onClick }, children }) => {
        return m(selector + block("button", modifiers), {
            onclick: () => {
                if (onClick) {
                    onClick();
                }
            },
        }, children);
    },
};
//# sourceMappingURL=Button.js.map