import m from "mithril";
export const ProgressBar = {
    oninit: ({ state }) => {
        state.initialising = true;
        setTimeout(() => {
            state.initialising = false;
            m.redraw();
        }, 50);
    },
    view: ({ attrs: { progress, color }, state: { initialising } }) => {
        if (progress < 0) {
            progress = 0;
        }
        if (progress > 100) {
            progress = 100;
        }
        return m(".progress-bar" + (color ? `.bg-${color}` : ""), [
            m(".progress-bar__progress", { style: `width: ${progress}%` }),
        ]);
    },
};
//# sourceMappingURL=ProgressBar.js.map