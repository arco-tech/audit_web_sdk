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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var CheckBoxList_1 = require("./components/inputs/CheckBoxList");
var DateInput_1 = require("./components/inputs/DateInput");
var DateRangeInput_1 = require("./components/inputs/DateRangeInput");
var Input_1 = require("./components/inputs/Input");
var TextArea_1 = require("./components/inputs/TextArea");
var InputList_1 = require("./components/inputs/InputList");
var NumberInput_1 = require("./components/inputs/NumberInput");
var RadioList_1 = require("./components/inputs/RadioList");
var GridInput_1 = require("./components/inputs/GridInput");
var TableInput_1 = require("./components/inputs/TableInput");
var Selector_1 = require("./components/inputs/Selector");
var FileUploadInput_1 = require("./components/inputs/FileUploadInput");
var Log_1 = require("./Log");
var ErrorMessage_1 = require("./components/ErrorMessage");
var setValueText = function (question, value, changeset) {
    var formattedValue = Array.isArray(value) ? value.join(", ") : value;
    changeset.change(question.id().toString(), formattedValue);
    return true;
};
var setValueFloat = function (question, value, changeset) {
    var num;
    if (Array.isArray(value)) {
        num = parseFloat(value[0]);
    }
    else {
        num = typeof value == "string" ? parseFloat(value) : value;
    }
    if (num) {
        changeset.change(question.id().toString(), num);
        return true;
    }
    return false;
};
var types = {
    text: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            return typeof value === "string" && value.trim() !== "";
        },
        render: function (question, attrs) {
            return m(Input_1.Input, attrs);
        },
        setValue: setValueText,
    },
    paragraph: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            return typeof value === "string" && value.trim() !== "";
        },
        render: function (question, attrs) {
            return m(TextArea_1.TextArea, attrs);
        },
        setValue: setValueText,
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
        setValue: function (question, values, changeset) {
            var list = typeof values == "string" ? values.split(",") : values;
            if (Array.isArray(list)) {
                changeset.change(question.id().toString(), __spreadArrays(list));
                return true;
            }
            return false;
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
        setValue: setValueFloat,
    },
    percentage: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            return typeof value === "number";
        },
        render: function (question, attrs) {
            return m(NumberInput_1.NumberInput, attrs);
        },
        setValue: setValueFloat,
    },
    button: {
        optionGoesTo: true,
        isComplete: function (question, value) {
            return typeof value === "number" && findOption(question, value) !== null;
        },
        render: function (question, attrs) {
            return m(RadioList_1.RadioList, __assign({ options: buildOptions(question) }, attrs));
        },
        setValue: function (question, value, changeset) {
            var option = question.options().find(function (option) {
                return option.label() === value;
            });
            if (option) {
                changeset.change(question.id().toString(), option.id());
                return true;
            }
            return false;
        },
    },
    multi_button: {
        optionGoesTo: false,
        isComplete: function (question, value) { return true; },
        render: function (question, attrs) {
            return m(CheckBoxList_1.CheckBoxList, __assign({ options: buildOptions(question) }, attrs));
        },
        setValue: function (question, values, changeset) {
            if (typeof values == "number") {
                return false;
            }
            var list = typeof values == "string" ? values.split(",") : values;
            var ids = (list || []).reduce(function (acc, value) {
                var option = question.options().find(function (option) {
                    return option.label() === value;
                });
                option && acc.push(option.id());
                return acc;
            }, []);
            changeset.change(question.id().toString(), ids);
            return ids.length != 0;
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
        setValue: function (question, value, changeset) {
            var option = question.options().find(function (option) {
                return option.label() === value;
            });
            if (option) {
                changeset.change(question.id().toString(), option.id().toString());
                return true;
            }
            return false;
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
        setValue: function (question, value, changeset) {
            var date = typeof value == "string" ? new Date(value) : new Date(value[0]);
            if (date.toString() != "Invalid Date") {
                changeset.change(question.id().toString(), date);
                return true;
            }
            return false;
        },
    },
    date_range: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            return (value != null &&
                typeof value === "object" &&
                value.from != null &&
                !isNaN(new Date(value.from).getTime()));
        },
        render: function (question, attrs) {
            return m(DateRangeInput_1.DateRangeInput, attrs);
        },
        setValue: function (question, values, changeset) {
            if (typeof values == "number") {
                return false;
            }
            var list = typeof values == "string" ? values.split(",") : values;
            var _a = list.map(function (date) { return new Date(date); }), from = _a[0], to = _a[1];
            if (from.toString() != "Invalid Date" &&
                to.toString() != "Invalid Date") {
                changeset.change(question.id().toString(), { from: from, to: to });
                return true;
            }
            return false;
        },
    },
    grid: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            if (!Array.isArray(value)) {
                return false;
            }
            for (var rowIndex in value) {
                for (var columnIndex in value[rowIndex]) {
                    if (value[rowIndex][columnIndex] ||
                        value[rowIndex][columnIndex] === 0) {
                        return true;
                    }
                }
            }
            return false;
        },
        render: function (question, attrs) {
            var settings = question.metadata().gridSettings();
            if (settings) {
                return m(GridInput_1.GridInput, __assign(__assign({}, attrs), { settings: settings }));
            }
            else {
                return m(ErrorMessage_1.ErrorMessage, { error: "invalid grid settings" });
            }
        },
        setValue: function (question, values, changeset) {
            if (Array.isArray(values) &&
                values[0].length > 0 &&
                Array.isArray(values[0])) {
                changeset.change(question.id().toString(), values);
                return true;
            }
            return false;
        },
    },
    table: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            if (!Array.isArray(value)) {
                return false;
            }
            for (var rowIndex in value) {
                for (var columnIndex in value[rowIndex]) {
                    if (value[rowIndex][columnIndex] ||
                        value[rowIndex][columnIndex] === 0) {
                        return true;
                    }
                }
            }
            return false;
        },
        render: function (question, attrs) {
            var settings = question.metadata().tableSettings();
            if (settings) {
                return m(TableInput_1.TableInput, __assign(__assign({}, attrs), { settings: settings }));
            }
            else {
                return m(ErrorMessage_1.ErrorMessage, { error: "invalid table settings" });
            }
        },
        setValue: function (question, values, changeset) {
            if (Array.isArray(values) &&
                values[0].length > 0 &&
                Array.isArray(values[0])) {
                changeset.change(question.id().toString(), values);
                return true;
            }
            return false;
        },
    },
    files: {
        optionGoesTo: false,
        isComplete: function (question, value) {
            return Array.isArray(value) && value.length > 0;
        },
        render: function (question, attrs) {
            return m(FileUploadInput_1.FileUploadInput, attrs);
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
    return (question.options().find(function (option) {
        return option.id() === id;
    }) || null);
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
function setValue(question, value, changeset) {
    if (questionType(question)) {
        return questionType(question).setValue(question, value, changeset);
    }
    else {
        Log_1.log("error", ["Question type isn't defined", question.type()]);
        return null;
    }
}
exports.setValue = setValue;
function overrideRender(questionType, render) {
    if (types[questionType]) {
        types[questionType].render = render;
    }
    else {
        throw new Error("Question type '" + questionType + " doesn't exist");
    }
}
exports.overrideRender = overrideRender;
function buildOptions(question) {
    return question.options().map(function (option) {
        return { label: option.label(), value: option.id() };
    });
}
//# sourceMappingURL=Questions.js.map