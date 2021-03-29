"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                m(BEM_1.block("previous-values__tooltip", state.hover && "open"), [
                    m(".previous-values__tooltip__value", value),
                    m(".previous-values__tooltip__message", state.copyFailed ? "FAILED TO COPY" : "CLICK TO USE"),
                ]),
            ]),
        ]);
    },
};
var parseRespone = function (response) {
    if (Array.isArray(response)) {
        return response.join(", ");
    }
    else if (typeof response == "number") {
        return response.toString();
    }
    else if (typeof response == "string" && response.search(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
        return DateTime_1.displayDate(new Date(response));
    }
    return response.replace(",", ", ");
};
//# sourceMappingURL=PreviousValue.js.map