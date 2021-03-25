"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var periods = [
    { name: "second", milliseconds: 1000 },
    { name: "minute", milliseconds: 60000 },
    { name: "hour", milliseconds: 3600000 },
    { name: "day", milliseconds: 86400000 },
    { name: "week", milliseconds: 604800000 },
    { name: "month", milliseconds: 2592000000 },
    { name: "year", milliseconds: 31536000000 },
];
function monthName(month) {
    return monthNames[month] || null;
}
exports.monthName = monthName;
function shortMonthName(month) {
    return monthNames[month] ? monthNames[month].substring(0, 3) : null;
}
exports.shortMonthName = shortMonthName;
function relative(date) {
    if (!date)
        return "never";
    var diff = new Date().getTime() - date.getTime();
    for (var p = periods.length - 1; p >= 0; p--) {
        if (diff > periods[p].milliseconds) {
            var time = Math.round(diff / periods[p].milliseconds);
            return time + " " + periods[p].name + (time == 1 ? "" : "s") + " ago";
        }
    }
    return "now";
}
exports.relative = relative;
function formatDateTime(date) {
    return formatDate(date) + " " + formatTime(date);
}
exports.formatDateTime = formatDateTime;
function formatTime(date) {
    var hours = date.getHours();
    var displayMinutes = padNumber(date.getMinutes());
    var displayHours = padNumber(hours % 12 === 0 ? 12 : hours % 12);
    return displayHours + ":" + displayMinutes + (hours >= 12 ? "pm" : "am");
}
exports.formatTime = formatTime;
function formatDate(date) {
    var day = padNumber(date.getDate());
    var month = padNumber(date.getMonth() + 1);
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}
exports.formatDate = formatDate;
function padNumber(num) {
    var numString = "" + num;
    return numString.length == 1 ? "0" + numString : numString;
}
//# sourceMappingURL=DateTime.js.map