import m from "mithril";

interface Attrs {
  percentage: number;
  color?: string;
  lineWidth: number;
}

interface State {
  initialising: boolean
}

type Vnode = m.Vnode<Attrs>;

const pi = 3.14159;

export const PercentageCircle: m.Component<Attrs, State> = {
  oninit: ({state}) => {
    state.initialising = true;
    setTimeout(() => {
      state.initialising = false;
      m.redraw();
    }, 50);
  },

  view: ({
    attrs: {percentage, color, lineWidth=1.5},
    state: {initialising},
  }) => {
    if (initialising) { percentage = 0; }
    const boxSize = 36;
    const circumference = 100;
    const radius = circumference / (pi * 2);
    const diameter = radius * 2;
    return m("svg.percentage-circle", {viewBox: `0 0 ${boxSize} ${boxSize}`}, [
      m("circle.percentage-circle__background-circle", {
        style: `stroke-width: ${lineWidth}`,
        cx: boxSize / 2,
        cy: boxSize / 2,
        r: radius,
      }),
      m("path.percentage-circle__line", {
        style: [
          `stroke-width: ${lineWidth}`,
          `stroke-dasharray: ${percentage}, 100`,
          color ? `stroke: ${color};` : null,
        ].filter((style) => style).join(";"),
        d:
          `M${boxSize / 2} ${(boxSize - diameter) / 2} ` +
          `a ${radius} ${radius} 0 0 1 0 ${diameter} ` +
          `a ${radius} ${radius} 0 0 1 0 ${-diameter}`,
      }),
    ]);
  },
};
