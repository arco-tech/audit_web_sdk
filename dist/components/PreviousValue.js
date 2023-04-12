"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousValue = void 0;
var m = require("mithril");
var Questions = require("../Questions");
var BEM_1 = require("../BEM");
var DateTime_1 = require("../DateTime");
exports.PreviousValue = {
    oninit: function (_a) {
        var state = _a.state;
        state.hover = false;
        state.copyFailed = false;
    },
    view: function (_a) {
        var _b = _a.attrs, question = _b.question, previousValues = _b.previousValues, changeset = _b.changeset, state = _a.state;
        var namedId = question.namedID();
        if (!namedId)
            return null;
        var response = previousValues[namedId];
        if (!response)
            return null;
        var value = parseRespone(response);
        if (value == "")
            return null;
        return m(".previous-values", [
            m(".previous-values__title", "Previous response: "),
            m(".previous-values__value", value),
            m(".previous-values__copy", {
                onclick: function () {
                    state.copyFailed = !Questions.setValue(question, response, changeset);
                },
                onmouseenter: function () {
                    state.hover = true;
                },
                onmouseleave: function () {
                    state.hover = false;
                },
            }, [
                "copy",
                m("img.previous-values__copy__icon", {
                    src: "/images/icons/copy-with-arrow.svg",
                    width: 20.9,
                    height: 19,
                }),
                m((0, BEM_1.block)("previous-values__tooltip", state.hover && "open"), [
                    m(".previous-values__tooltip__value", value),
                    m(".previous-values__tooltip__message", state.copyFailed ? "FAILED TO COPY" : "CLICK TO USE"),
                ]),
            ]),
        ]);
    },
};
var parseRespone = function (response) {
    if (Array.isArray(response)) {
        if (response.length > 0 && Array.isArray(response[0])) {
            return response
                .map(function (row) {
                return row
                    .map(function (value) {
                    if (!value) {
                        return "empty";
                    }
                    return value;
                })
                    .join(", ");
            })
                .join("\n");
        }
        return response.join(", ");
    }
    else if (typeof response == "number") {
        return response.toString();
    }
    else if (typeof response == "string" &&
        response.search(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) != -1) {
        return (0, DateTime_1.displayDate)(new Date(response));
    }
    else if (response.from || response.to) {
        return "".concat((0, DateTime_1.displayDate)(new Date(response.from)), " - ").concat((0, DateTime_1.displayDate)(new Date(response.to)));
    }
    return response.replace(",", ", ");
};
//# sourceMappingURL=PreviousValue.js.map