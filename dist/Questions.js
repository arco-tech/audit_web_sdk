"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var CheckBoxList_1 = require("./components/inputs/CheckBoxList");
var DateInput_1 = require("./components/inputs/DateInput");
var DateRangeInput_1 = require("./components/inputs/DateRangeInput");
var Input_1 = require("./components/inputs/Input");
var InputList_1 = require("./components/inputs/InputList");
var NumberInput_1 = require("./components/inputs/NumberInput");
var RadioList_1 = require("./components/inputs/RadioList");
var Selector_1 = require("./components/inputs/Selector");
var Log_1 = require("./Log");
var types = {
    text: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            return typeof value === "string" && value.trim() !== "";
        },
        render: function (question, attrs) {
            return m(Input_1.Input, attrs);
        },
    },
    multi_text: {
        optionGoesTo: false,
        isComplete: function (question, valueList) {
            if (Array.isArray(valueList)) {
                var validValues = valueList.map(function (value) {
                    return typeof value === "string" && value.trim() !== "";
                });
                return validValues.indexOf(true) !== -1;
            }
            else {
                return false;
            }
        },
        render: function (question, attrs) {
            return m(InputList_1.InputList, attrs);
        },
    },
    number: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            return typeof value === "number";
        },
        render: function (question, attrs) {
            return m(NumberInput_1.NumberInput, attrs);
        },
    },
    percentage: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            return typeof value === "number";
        },
        render: function (question, attrs) {
            return m(NumberInput_1.NumberInput, attrs);
        },
    },
    button: {
        optionGoesTo: true,
        isComplete: function (question, value) {
            return typeof value === "number" && findOption(question, value) !== null;
        },
        render: function (question, attrs) {
            return m(RadioList_1.RadioList, __assign({ options: buildOptions(question) }, attrs));
        },
    },
    multi_button: {
        optionGoesTo: false,
        isComplete: function (question, value) { return true; },
        render: function (question, attrs) {
            return m(CheckBoxList_1.CheckBoxList, __assign({ options: buildOptions(question) }, attrs));
        },
    },
    dropdown: {
        optionGoesTo: true,
        isComplete: function (question, value) {
            return typeof value === "number" && findOption(question, value) !== null;
        },
        render: function (question, attrs) {
            return m(Selector_1.Selector, __assign({ options: buildOptions(question), integerValues: true }, attrs));
        },
    },
    date: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            return value != null && !isNaN(new Date(value).getTime());
        },
        render: function (question, attrs) {
            return m(DateInput_1.DateInput, attrs);
        },
    },
    date_range: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            return (value != null &&
                typeof value === "object" &&
                value.from != null &&
                value.to != null &&
                !isNaN(new Date(value.from).getTime()) &&
                !isNaN(new Date(value.to).getTime()));
        },
        render: function (question, attrs) {
            return m(DateRangeInput_1.DateRangeInput, attrs);
        },
    },
};
var fallbackType = {
    optionGoesTo: false,
    isComplete: function () { return false; },
    render: function () { return null; },
};
function questionType(question) {
    return types[question.type()] || fallbackType;
}
function goesTo(question, value) {
    if (questionType(question)) {
        if (questionType(question).optionGoesTo) {
            var option = findOption(question, value);
            return option ? option.goesTo() : null;
        }
        else {
            return question.goesTo();
        }
    }
    else {
        Log_1.log("error", ["Question type isn't defined", question.type()]);
    }
}
exports.goesTo = goesTo;
function isComplete(question, value) {
    if (questionType(question)) {
        return questionType(question).isComplete(question, value);
    }
    else {
        Log_1.log("error", ["Question type isn't defined", question.type()]);
    }
}
exports.isComplete = isComplete;
function findOption(question, id) {
    return question.options().find(function (option) {
        return option.id() === id;
    }) || null;
}
exports.findOption = findOption;
function render(question, attrs) {
    if (questionType(question)) {
        return questionType(question).render(question, attrs);
    }
    else {
        Log_1.log("error", ["Question type isn't defined", question.type()]);
        return null;
    }
}
exports.render = render;
function buildOptions(question) {
    return question.options().map(function (option) {
        return { label: option.label(), value: option.id() };
    });
}
//# sourceMappingURL=Questions.js.map