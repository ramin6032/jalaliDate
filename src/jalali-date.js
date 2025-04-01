/**
 * JalaliDate - A class for working with Jalali (Persian/Shamsi) calendar
 * with no dependencies.
 */
class JalaliDate {
  constructor(year, month, day) {
    // Allow creating from a Date object
    if (arguments.length === 1 && arguments[0] instanceof Date) {
      const converted = JalaliDate.toJalali(arguments[0]);
      this.year = converted.year;
      this.month = converted.month;
      this.day = converted.day;
    } else {
      // Allow creating directly with jalali year, month, day
      this.year = year;
      this.month = month;
      this.day = day;
    }
  }

  /**
   * Get current date in Jalali calendar
   * @returns {JalaliDate}
   */
  static now() {
    return new JalaliDate(new Date());
  }

  /**
   * Format the date as a string
   * @returns {string} formatted date as YYYY/MM/DD
   */
  format() {
    const y = this.year;
    const m = this.month < 10 ? `0${this.month}` : this.month;
    const d = this.day < 10 ? `0${this.day}` : this.day;
    return `${y}/${m}/${d}`;
  }

  /**
   * Convert a JavaScript Date object to Jalali date
   * @param {Date} date - JavaScript Date object
   * @returns {Object} - Object containing Jalali year, month (1-12), and day
   */
  static toJalali(date) {
    const gregorianYear = date.getFullYear();
    const gregorianMonth = date.getMonth() + 1;
    const gregorianDay = date.getDate();

    const jdn = JalaliDate._gregorianToJDN(
      gregorianYear,
      gregorianMonth,
      gregorianDay
    );
    return JalaliDate._JDNToJalali(jdn);
  }

  /**
   * Convert Gregorian date to Julian Day Number
   */
  static _gregorianToJDN(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    year = year + 4800 - a;
    month = month + 12 * a - 3;
    return (
      day +
      Math.floor((153 * month + 2) / 5) +
      365 * year +
      Math.floor(year / 4) -
      Math.floor(year / 100) +
      Math.floor(year / 400) -
      32045
    );
  }

  /**
   * Convert Julian Day Number to Jalali date
   */
  static _JDNToJalali(jdn) {
    const depoch = jdn - JalaliDate._gregorianToJDN(475, 1, 1);
    const cycle = Math.floor(depoch / 1029983);
    const cyear = depoch % 1029983;
    let ycycle;

    if (cyear === 1029982) {
      ycycle = 2820;
    } else {
      const aux1 = Math.floor(cyear / 366);
      const aux2 = cyear % 366;
      ycycle =
        Math.floor((2134 * aux1 + 2816 * aux2 + 2815) / 1028522) + aux1 + 1;
    }

    let year = ycycle + 2820 * cycle + 474;
    if (year <= 0) year--;

    const yday = jdn - JalaliDate._gregorianToJDN(year, 1, 1) + 1;
    const month =
      yday <= 186 ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
    const day = jdn - JalaliDate._gregorianToJDN(year, month, 1) + 1;

    return { year, month, day };
  }
}

// For Node.js environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = JalaliDate;
}
