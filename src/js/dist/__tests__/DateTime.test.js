"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var DateTime = require("../DateTime");
ava_1.default("monthName returns the correct month name", function (t) {
    t.is(DateTime.monthName(0), "January");
    t.is(DateTime.monthName(2), "March");
    t.is(DateTime.monthName(11), "December");
});
ava_1.default("monthName returns null when out of range", function (t) {
    t.is(DateTime.monthName(12), null);
});
ava_1.default("shortMonthName returns the correct shortened month name", function (t) {
    t.is(DateTime.shortMonthName(0), "Jan");
    t.is(DateTime.shortMonthName(3), "Apr");
    t.is(DateTime.shortMonthName(4), "May");
});
ava_1.default("shortMonthName returns null when out of range", function (t) {
    t.is(DateTime.shortMonthName(12), null);
});
ava_1.default("relative returns the correctly formatted string", function (t) {
    var date = new Date();
    t.is(DateTime.relative(date), "now");
    date.setSeconds(date.getSeconds() - 43);
    t.is(DateTime.relative(date), "43 seconds ago");
    date = new Date();
    date.setDate(date.getDate() - 14);
    t.is(DateTime.relative(date), "2 weeks ago");
    date = new Date();
    date.setFullYear(date.getFullYear() - 10);
    t.is(DateTime.relative(date), "10 years ago");
});
//# sourceMappingURL=DateTime.test.js.map