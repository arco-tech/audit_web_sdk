"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var pi = 3.14159;
exports.PercentageCircle = {
    view: function (_a) {
        var _b = _a.attrs, percentage = _b.percentage, color = _b.color, _c = _b.lineWidth, lineWidth = _c === void 0 ? 1.5 : _c;
        var boxSize = 36;
        var circumference = 100;
        var radius = circumference / (pi * 2);
        var diameter = radius * 2;
        return m("svg.percentage-circle", { viewBox: "0 0 " + boxSize + " " + boxSize }, [
            m("circle.percentage-circle__background-circle", {
                style: "stroke-width: " + lineWidth,
                cx: boxSize / 2,
                cy: boxSize / 2,
                r: radius,
            }),
            m("path.percentage-circle__line", {
                style: [
                    "stroke-width: " + lineWidth,
                    "stroke-dasharray: " + percentage + ", 100",
                    color ? "stroke: " + color + ";" : null,
                ].filter(function (style) { return style; }).join(";"),
                d: "M" + boxSize / 2 + " " + (boxSize - diameter) / 2 + " " +
                    ("a " + radius + " " + radius + " 0 0 1 0 " + diameter + " ") +
                    ("a " + radius + " " + radius + " 0 0 1 0 " + -diameter),
            }),
        ]);
    },
};
//# sourceMappingURL=PercentageCircle.js.map