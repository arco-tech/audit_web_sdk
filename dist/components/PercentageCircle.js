"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentageCircle = void 0;
var m = require("mithril");
var pi = 3.14159;
exports.PercentageCircle = {
    oninit: function (_a) {
        var state = _a.state;
        state.initialising = true;
        setTimeout(function () {
            state.initialising = false;
            m.redraw();
        }, 50);
    },
    view: function (_a) {
        var _b = _a.attrs, percentage = _b.percentage, color = _b.color, _c = _b.lineWidth, lineWidth = _c === void 0 ? 1.5 : _c, initialising = _a.state.initialising;
        if (initialising) {
            percentage = 0;
        }
        var boxSize = 36;
        var circumference = 100;
        var radius = circumference / (pi * 2);
        var diameter = radius * 2;
        return m("svg.percentage-circle", { viewBox: "0 0 ".concat(boxSize, " ").concat(boxSize) }, [
            m("circle.percentage-circle__background-circle", {
                style: "stroke-width: ".concat(lineWidth),
                cx: boxSize / 2,
                cy: boxSize / 2,
                r: radius,
            }),
            m("path.percentage-circle__line", {
                style: [
                    "stroke-width: ".concat(lineWidth),
                    "stroke-dasharray: ".concat(percentage, ", 100"),
                    color ? "stroke: ".concat(color, ";") : null,
                ].filter(function (style) { return style; }).join(";"),
                d: "M".concat(boxSize / 2, " ").concat((boxSize - diameter) / 2, " ") +
                    "a ".concat(radius, " ").concat(radius, " 0 0 1 0 ").concat(diameter, " ") +
                    "a ".concat(radius, " ").concat(radius, " 0 0 1 0 ").concat(-diameter),
            }),
        ]);
    },
};
//# sourceMappingURL=PercentageCircle.js.map