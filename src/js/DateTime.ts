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
  {name: "second", milliseconds: 1000},
  {name: "minute", milliseconds: 60000},
  {name: "hour", milliseconds: 3600000},
  {name: "day", milliseconds: 86400000},
  {name: "week", milliseconds: 604800000},
  {name: "month", milliseconds: 2592000000},
  {name: "year", milliseconds: 31536000000},
];

export function monthName(month: number): string | null {
  return monthNames[month] || null;
}

export function shortMonthName(month: number): string | null {
  return monthNames[month] ? monthNames[month].substring(0, 3) : null;
}

export function relative(date: Date) {
  if(!date) return "never";
  const diff = new Date().getTime() - date.getTime();

  for(let p = periods.length - 1; p >= 0; p--) {
    if(diff > periods[p].milliseconds) {
      const time = Math.round(diff / periods[p].milliseconds);
      return `${time} ${periods[p].name}${time == 1 ? "" : "s"} ago`;
    }
  }

  return "now";
}
