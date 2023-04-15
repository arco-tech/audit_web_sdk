import test from "ava";
import * as DateTime from "../DateTime.js";
test("monthName returns the correct month name", (t) => {
    t.is(DateTime.monthName(0), "January");
    t.is(DateTime.monthName(2), "March");
    t.is(DateTime.monthName(11), "December");
});
test("monthName returns null when out of range", (t) => {
    t.is(DateTime.monthName(12), null);
});
test("shortMonthName returns the correct shortened month name", (t) => {
    t.is(DateTime.shortMonthName(0), "Jan");
    t.is(DateTime.shortMonthName(3), "Apr");
    t.is(DateTime.shortMonthName(4), "May");
});
test("shortMonthName returns null when out of range", (t) => {
    t.is(DateTime.shortMonthName(12), null);
});
test("relative returns the correctly formatted string", (t) => {
    let date = new Date();
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