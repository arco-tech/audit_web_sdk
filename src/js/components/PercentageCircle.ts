import * as m from "mithril";

interface Attrs {
  percentage: number;
  color?: string;
}

type Vnode = m.Vnode<Attrs>;

const pi = 3.14159;

export const PercentageCircle: m.Component<Attrs> = {
  view: ({attrs: {percentage, color}}: Vnode) => {
    const boxSize = 36;
    const circumference = 100;
    const radius = circumference / (pi * 2);
    const diameter = radius * 2;
    return m("svg.percentage-circle", {viewBox: `0 0 ${boxSize} ${boxSize}`}, [
      m("circle.percentage-circle__background-circle", {
        cx: boxSize / 2,
        cy: boxSize / 2,
        r: radius,
      }),
      m("path.percentage-circle__line", {
        style:
          `stroke-dasharray: ${percentage}, 100; ${
            color ? `stroke: ${color};` : ""
          }`,
        d:
          `M${boxSize / 2} ${(boxSize - diameter) / 2} ` +
          `a ${radius} ${radius} 0 0 1 0 ${diameter} ` +
          `a ${radius} ${radius} 0 0 1 0 ${-diameter}`,
      }),
    ]);
  },
};
