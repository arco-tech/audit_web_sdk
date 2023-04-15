import * as m from "mithril";
import { block } from "../BEM.js";
export const ProgressPercentage = {
    oninit: (vnode) => {
        vnode.state.display = 0;
    },
    onbeforeremove: (vnode) => {
        clearTimeout(vnode.state.timeout);
    },
    view: (vnode) => {
        updateState(vnode);
        const complete = vnode.state.display === 100;
        const modifiers = complete ? ["complete"] : [];
        const color = vnode.attrs.color || (complete ? "primary" : "grey");
        const selector = (vnode.attrs.selector || "") +
            `.color-${color}` +
            block(".progress-percentage", modifiers);
        return m(selector, `${Math.round(vnode.state.display)}%`);
    },
};
function updateState(vnode) {
    const { attrs: { progress }, state: { display, timeout } } = vnode;
    const difference = Math.abs(progress - display);
    clearTimeout(timeout);
    if (difference >= 1) {
        let change = difference * 0.2;
        if (display > progress) {
            change = -change;
        }
        vnode.state.display += change;
        if (difference !== 0) {
            vnode.state.timeout = setTimeout(() => {
                updateState(vnode);
                m.redraw();
            }, 40);
        }
    }
    else {
        vnode.state.display = progress;
    }
}
//# sourceMappingURL=ProgressPercentage.js.map