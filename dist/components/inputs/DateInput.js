"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var DateTime = require("../../DateTime");
var BEM_1 = require("../../BEM");
exports.DateInput = {
    oninit: function (_a) {
        var _b = _a.attrs, changeset = _b.changeset, name = _b.name, state = _a.state;
        state.date = dateFromChangeset(changeset, name);
    },
    view: function (_a) {
        var _b = _a.attrs, changeset = _b.changeset, name = _b.name, _c = _b.placeholder, placeholder = _c === void 0 ? "Select a Date" : _c, attrs = __rest(_b, ["changeset", "name", "placeholder"]), state = _a.state;
        var date = state.date;
        return m(BEM_1.block("date-input", state.expand && "active"), {
            onclick: function () {
                if (!state.expand) {
                    state.expand = true;
                }
            },
        }, [
            displayValue(changeset.getValue(name), placeholder),
            state.expand && m(".date-input__picker-dropdown", [
                m(".date-input__picker-dropdown__title", "Select a Date"),
                m(".date-input__picker-dropdown__pickers", [
                    m(Picker, {
                        display: date.getDate(),
                        change: function (amount) { date.setDate(date.getDate() + amount); },
                    }),
                    m(Picker, {
                        display: DateTime.monthName(date.getMonth()),
                        change: function (amount) { date.setMonth(date.getMonth() + amount); },
                    }),
                    m(Picker, {
                        display: date.getFullYear(),
                        change: function (amount) {
                            date.setFullYear(date.getFullYear() + amount);
                        },
                    }),
                ]),
                m(".date-input__picker-dropdown__button-row", [
                    m(".link.link--primary.margin-right-medium", {
                        onclick: function () {
                            state.date = dateFromChangeset(changeset, name);
                            setTimeout(function () {
                                state.expand = false;
                                m.redraw();
                            });
                        },
                    }, "Cancel"),
                    m(".link.link--primary.margin-right-medium", {
                        onclick: function () {
                            changeset.change(name, null);
                            setTimeout(function () {
                                state.expand = false;
                                m.redraw();
                            });
                        },
                    }, "Clear"),
                    m(".link.link--primary", {
                        onclick: function () {
                            var value = formatValue(date);
                            changeset.change(name, value);
                            setTimeout(function () {
                                state.expand = false;
                                m.redraw();
                            });
                        },
                    }, "Apply"),
                ]),
            ]),
        ]);
    },
};
var Picker = {
    view: function (_a) {
        var _b = _a.attrs, display = _b.display, change = _b.change;
        return m(".date-input__picker-dropdown__picker", [
            m(BEM_1.block("date-input__picker-dropdown__picker__arrow", "up"), {
                onclick: function () { change(1); },
            }),
            m(".date-input__picker-dropdown__picker__value", display),
            m(BEM_1.block("date-input__picker-dropdown__picker__arrow", "down"), { onclick: function () { change(-1); } }),
        ]);
    },
};
function displayValue(value, placeholder) {
    if (value) {
        var date = new Date(value);
        if (!isNaN(date.getTime())) {
            var monthName = DateTime.shortMonthName(date.getMonth());
            return m(".date-input__display-value", [
                date.getDate() + " " + monthName + " " + date.getFullYear(),
            ]);
        }
    }
    return m(BEM_1.block("date-input__display-value", "placeholder"), placeholder);
}
function formatValue(date) {
    date.getFullYear() + "-" + zeroPad(date.getMonth() + 1) +
        ("-" + zeroPad(date.getDate()));
}
function zeroPad(value) {
    return value < 10 ? "0" + value : "" + value;
}
function dateFromChangeset(changeset, name) {
    var dateValue = changeset.getValue(name);
    var date = dateValue ? new Date(dateValue) : new Date();
    return !isNaN(date.getTime()) ? date : new Date();
}
//# sourceMappingURL=DateInput.js.map