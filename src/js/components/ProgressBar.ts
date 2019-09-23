import * as m from "mithril";

interface Attrs {
  progress: number;
}

type Vnode = m.Vnode<Attrs>;

export const ProgressBar: m.Component<Attrs> = {
  view: ({attrs: {progress}}: Vnode) => {
    if (progress < 0) { progress = 0; }
    if (progress > 100) { progress = 100; }
    return m(".progress-bar", [
      m(".progress-bar__progress", {style: `width: ${progress}%`}),
    ]);
  },
};
