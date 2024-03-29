import m from "mithril";
import {block} from "../BEM.js";

interface Attrs {
  selector?: string;
  progress: number;
  color?: string;
}

interface State {
  display: number;
  timeout: any;
}

type Vnode = m.Vnode<Attrs, State>;

export const ProgressPercentage: m.Component<Attrs, State> = {
  oninit: (vnode: Vnode) => {
    vnode.state.display = 0;
  },

  onbeforeremove: (vnode: Vnode) => {
    clearTimeout(vnode.state.timeout);
  },

  view: (vnode: Vnode) => {
    updateState(vnode);
    const complete = vnode.state.display === 100;
    const modifiers = complete ? ["complete"] : [];
    const color = vnode.attrs.color || (complete ? "primary" : "grey");
    const selector =
      (vnode.attrs.selector || "") +
      `.color-${color}` +
      block(".progress-percentage", modifiers);
    return m(selector, `${Math.round(vnode.state.display)}%`);
  },
};

function updateState(vnode: Vnode) {
  const {attrs: {progress}, state: {display, timeout}} = vnode;
  const difference = Math.abs(progress - display);
  clearTimeout(timeout);
  if (difference >= 1) {
    let change = difference * 0.2;
    if (display > progress) { change = -change; }
    vnode.state.display += change;
    if (difference !== 0) {
      vnode.state.timeout = setTimeout(() => {
        updateState(vnode);
        m.redraw();
      }, 40);
    }
  } else {
    vnode.state.display = progress;
  }
}
