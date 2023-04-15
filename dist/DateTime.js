const monthNames = [
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
const periods = [
    { name: "second", milliseconds: 1000 },
    { name: "minute", milliseconds: 60000 },
    { name: "hour", milliseconds: 3600000 },
    { name: "day", milliseconds: 86400000 },
    { name: "week", milliseconds: 604800000 },
    { name: "month", milliseconds: 2592000000 },
    { name: "year", milliseconds: 31536000000 },
];
export function monthName(month) {
    return monthNames[month] || null;
}
export function shortMonthName(month) {
    return monthNames[month] ? monthNames[month].substring(0, 3) : null;
}
export function relative(date) {
    if (!date)
        return "never";
    const diff = new Date().getTime() - date.getTime();
    for (let p = periods.length - 1; p >= 0; p--) {
        if (diff > periods[p].milliseconds) {
            const time = Math.round(diff / periods[p].milliseconds);
            return `${time} ${periods[p].name}${time == 1 ? "" : "s"} ago`;
        }
    }
    return "now";
}
export function formatDateTime(date) {
    return `${formatDate(date)} ${formatTime(date)}`;
}
export function formatTime(date) {
    const hours = date.getHours();
    const displayMinutes = padNumber(date.getMinutes());
    const displayHours = padNumber(hours % 12 === 0 ? 12 : hours % 12);
    return `${displayHours}:${displayMinutes}${hours >= 12 ? "pm" : "am"}`;
}
export function formatDate(date) {
    const day = padNumber(date.getDate());
    const month = padNumber(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
function padNumber(num) {
    const numString = `${num}`;
    return numString.length == 1 ? "0" + numString : numString;
}
export function displayDate(date) {
    if (isNaN(date.getDate())) {
        return "not set";
    }
    const monthName = shortMonthName(date.getMonth());
    return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
}
//# sourceMappingURL=DateTime.js.map