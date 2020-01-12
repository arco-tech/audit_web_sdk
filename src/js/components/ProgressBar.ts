import * as m from "mithril";

interface Attrs {
  progress: number;
  color?: string;
}

type Vnode = m.Vnode<Attrs>;

export const ProgressBar: m.Component<Attrs> = {
  oninit: ({state}) => {
    state.initialising = true;
    setTimeout(() => {
      state.initialising = false;
      m.redraw();
    }, 50);
  },

  view: ({attrs: {progress, color}, state: {initialising}}: Vnode) => {
    if (progress < 0) { progress = 0; }
    if (progress > 100) { progress = 100; }
    return m(".progress-bar" + (color ? `.bg-${color}` : ""), [
      m(".progress-bar__progress", {style: `width: ${progress}%`}),
    ]);
  },
};
