class Jalali {
  #gregorianDate;
  #gy;
  #gm;
  #gd;
  constructor(gy, gm, gd, time = "00:00:00", format = "YYYY/MM/DD") {
    if (arguments.length === 1 && !(arguments[0] instanceof Date)) {
      throw new Error("Invalid Gregorian Date provided.");
    }

    if (arguments.length === 1 && arguments[0] instanceof Date) {
      const gregorianDate = gy;
      const gregorianYear = gregorianDate.getFullYear();
      const gregorianMonth = gregorianDate.getMonth() + 1; // ماه در جاوااسکریپت از 0 شروع می‌شود
      const gregorianDay = gregorianDate.getDate();
      const dayOfWeekNumber = gregorianDate.getDay();
      const timestamp = gregorianDate.getTime();

      const [hoursParam, minutesParam, secondsParam] = time
        ? time.split(":")
        : [];

      const hours =
        hoursParam?.padStart(2, "0") ||
        String(gregorianDate.getHours()).padStart(2, "0");
      const minutes =
        minutesParam?.padStart(2, "0") ||
        String(gregorianDate.getMinutes())?.padStart(2, "0");
      const seconds =
        secondsParam?.padStart(2, "0") ||
        String(gregorianDate.getSeconds())?.padStart(2, "0");

      const jalaliDate = Jalali.toJalali(
        gregorianYear,
        gregorianMonth,
        gregorianDay
      );

      this.#gregorianDate = gregorianDate;
      this.#gy = gregorianYear;
      this.#gm = gregorianMonth;
      this.#gd = gregorianDay;
      this.year = jalaliDate.jy;
      this.month = jalaliDate.jm;
      this.day = jalaliDate.jd;
      this.dayOfWeekNumber = dayOfWeekNumber + 1;
      this.dayName = Jalali.getDayName(this.dayOfWeekNumber);
      this.monthName = Jalali.getMonthName(this.month);
      this.isKabise = Jalali.isKabise(this.year);
      this.isJalaliLeap = Jalali.isJalaliLeap(this.year);
      this.formatDate = this.#validateFormat(format) ? format : "YYYY/MM/DD";
      this.date = this.#DateToString();
      this.time = `${hours}:${minutes}:${seconds}`;
      this.timestamp = timestamp;
      this.#setDateTime(this.date, this.time);
      this.daysInMonth = Jalali.getDaysInMonth(this.year, this.month);
      this.daysInYear = Jalali.getDaysInMonth(this.year);
      this.season = Jalali.getSeason(this.month);
      this.longDate = `${this.dayName}, ${this.day} ${this.monthName} ${this.year}`;
      this.dayOfYear = this.getDayOfYear();
      this.weekOfYear = this.getWeekOfYear();
    } else if (arguments.length === 3) {
      return new Jalali(new Date(gy, gm - 1, gd));
    } else {
      return new Jalali(new Date());
    }
  }

  #setDateTime(date, time) {
    if (!date || !time) {
      throw new Error("Invalid date or time");
    }
    this.date = date;
    this.time = time;
    this.shortTime = time.split(":").slice(0, 2).join(":");
    this.dateTime = `${date} ${time}`;
    this.shortDateTime = `${this.date} ${this.shortTime}`;
    const [hours, minutes, seconds] = time.split(":");
    this.hours = hours.padStart(2, "0");
    this.minutes = minutes.padStart(2, "0");
    this.seconds = seconds.padStart(2, "0");
  }

  getYear() {
    return this.year;
  }

  getMonth() {
    return this.month;
  }

  getDay() {
    return this.day;
  }

  getDayOfWeek() {
    return this.dayOfWeekNumber;
  }

  static toJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let jy;

    if (gy > 1600) {
      jy = 979;
      gy -= 1600;
    } else {
      jy = 0;
      gy -= 621;
    }

    let gy2 = gm > 2 ? gy + 1 : gy;
    let days =
      365 * gy +
      Math.floor((gy2 + 3) / 4) -
      Math.floor((gy2 + 99) / 100) +
      Math.floor((gy2 + 399) / 400);

    for (let i = 0; i < gm; i++) {
      days += g_d_m[i];
    }
    days += gd - 1;

    let j_day_no = days - 79;
    let j_np = Math.floor(j_day_no / 12053);
    j_day_no %= 12053;

    jy += 33 * j_np + 4 * Math.floor(j_day_no / 1461);
    j_day_no %= 1461;

    if (j_day_no >= 366) {
      jy += Math.floor((j_day_no - 1) / 365);
      j_day_no = (j_day_no - 1) % 365;
    }

    let j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    // بررسی سال کبیسه
    if (
      jy % 33 === 1 ||
      jy % 33 === 5 ||
      jy % 33 === 9 ||
      jy % 33 === 13 ||
      jy % 33 === 17 ||
      jy % 33 === 22 ||
      jy % 33 === 26 ||
      jy % 33 === 30
    ) {
      j_days_in_month[11] = 30; // اسفند ۳۰ روزه در سال کبیسه
    }

    let jm;
    for (jm = 0; jm < 12 && j_day_no >= j_days_in_month[jm]; jm++) {
      j_day_no -= j_days_in_month[jm];
    }

    let jd = j_day_no + 1;

    return { jy, jm: jm + 1, jd };
  }

  static toGregorian(jy, jm, jd) {
    // Check if the Jalali year is a leap year
    const jalaliLeap = (jy - (jy > 0 ? 474 : 473)) % 2820;
    const isLeap =
      jalaliLeap === 2820 - 1 || jalaliLeap % 4 === (jy > 474 ? 0 : 3);

    // Days in each Jalali month
    const jalaliDaysInMonth = [
      31,
      isLeap ? 30 : 29,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    // Validate day based on month
    if (jd > jalaliDaysInMonth[jm - 1]) {
      throw new Error("Invalid day for Jalali month");
    }

    // Calculate day number in Jalali year (1-based)
    let dayOfYear = jd;
    for (let i = 0; i < jm - 1; i++) {
      dayOfYear += jalaliDaysInMonth[i];
    }

    // Calculate equivalent Gregorian date (March 21 + dayOfYear - 1)
    // March 21 is day 80 in a non-leap year, 81 in a leap year
    const gregYear = jy + 621;
    const isGregLeap =
      (gregYear % 4 === 0 && gregYear % 100 !== 0) || gregYear % 400 === 0;
    const march21DayOfYear = isGregLeap ? 81 : 80;

    let gregDayOfYear = march21DayOfYear + dayOfYear - 1;

    // Handle year overflow
    const daysInGregYear = isGregLeap ? 366 : 365;
    if (gregDayOfYear > daysInGregYear) {
      gregDayOfYear -= daysInGregYear;
      return dayToGregorian(gregYear + 1, gregDayOfYear);
    } else if (gregDayOfYear < 1) {
      return dayToGregorian(
        gregYear - 1,
        gregDayOfYear + (isGregLeap ? 366 : 365)
      );
    } else {
      return dayToGregorian(gregYear, gregDayOfYear);
    }
    function dayToGregorian(year, dayOfYear) {
      const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      const daysInMonth = [
        31,
        isLeap ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];

      let month = 0;
      let day = dayOfYear;
      for (let i = 0; i < daysInMonth.length; i++) {
        if (day <= daysInMonth[i]) {
          month = i + 1;
          break;
        }
        day -= daysInMonth[i];
      }

      return { gy: year, gm: month, gd: day };
    }
  }

  static isJalaliLeap(jy = new Jalali().year) {
    const remainder = jy % 33;
    return (
      remainder === 1 ||
      remainder === 5 ||
      remainder === 9 ||
      remainder === 13 ||
      remainder === 17 ||
      remainder === 22 ||
      remainder === 26 ||
      remainder === 30
    );
  }

  static isKabise(jy = new Jalali().year) {
    return Jalali.isJalaliLeap(jy);
  }

  format(format = this.formatDate) {
    if (this.#validateFormat(format)) {
      this.formatDate = format;
      this.date = this.#DateToString();
    }
  }

  #validateFormat(formatString) {
    if (formatString) {
      const validTokens = /^(YYYY|YY|MM|M|DD|D|[^A-Za-z])*$/gi;
      if (!validTokens.test(formatString)) {
        throw new Error(
          "فرمت وارد شده نامعتبر است! فقط از YYYY, YY, MM, M, DD, D استفاده کنید."
        );
      }
      return true;
    }
    return false;
  }

  #DateToString() {
    const year = this.year;
    const month = this.month;
    const day = this.day;
    return this.formatDate.replace(/YYYY|YY|MM|M|DD|D/gi, (match) => {
      switch (match.toUpperCase()) {
        case "YYYY":
          return year;
        case "YY":
          return String(year % 100).padStart(2, "0");
        case "MM":
          return String(month).padStart(2, "0");
        case "M":
          return month;
        case "DD":
          return String(day).padStart(2, "0");
        case "D":
          return day;
        default:
          return match;
      }
    });
  }

  static getDaysInMonth(year, month) {
    if (month < 1 || month > 12) {
      throw new Error("Month must be between 1 and 12");
    }

    // First 6 months have 31 days
    if (month <= 6) return 31;

    // Months 7-11 have 30 days
    if (month < 12) return 30;

    // Last month (12) has 29 days in normal years and 30 days in leap years
    return Jalali.isJalaliLeap(year) ? 30 : 29;
  }

  // Instance method to get days in current month
  getDaysInMonth() {
    return Jalali.getDaysInMonth(this.year, this.month);
  }

  /**
   * Get total days in a Jalali year
   * @param {number} [year] - Jalali year (optional, defaults to current instance year)
   * @returns {number} - Total days in the year (365 or 366)
   */
  static getDaysInYear(year) {
    return Jalali.isJalaliLeap(year) ? 366 : 365;
  }

  /**
   * Get total days in the current Jalali year
   * @returns {number} - Total days in the current year (365 or 366)
   */
  getDaysInYear() {
    return Jalali.getDaysInYear(this.year);
  }

  static getDayName(dayOfWeekNumber) {
    if (dayOfWeekNumber === null || dayOfWeekNumber === undefined) {
      throw new Error("dayOfWeekNumber param is invalid");
    }
    const days = [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
    ];
    return days[parseInt(dayOfWeekNumber)];
  }

  getDayName() {
    return Jalali.getDayName(this.dayOfWeekNumber);
  }

  static getMonthName(dayOfMonth) {
    if (dayOfMonth === null || dayOfMonth === undefined) {
      throw new Error("dayOfMonth param is invalid");
    }
    const month = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    return month[parseInt(dayOfMonth) - 1];
  }
  getMonthName() {
    return Jalali.getMonthName(this.month);
  }

  static getSeason(month) {
    if (month === null || month === undefined) {
      throw new Error("getSeason param is invalid");
    }
    const monthNumber = parseInt(month);
    if (monthNumber >= 1 && monthNumber <= 3) return "بهار";
    if (monthNumber >= 4 && monthNumber <= 6) return "تابستان";
    if (monthNumber >= 7 && monthNumber <= 9) return "پائیز";
    if (monthNumber >= 10 && monthNumber <= 12) return "زمستان";
  }
  getSeason() {
    return getSeason(this.month);
  }

  getDayOfYear() {
    const daysInMonths = [
      31,
      31,
      31,
      31,
      31,
      31,
      30,
      30,
      30,
      30,
      30,
      this.isJalaliLeap ? 30 : 29,
    ];
    return (
      daysInMonths
        .slice(0, this.month - 1)
        .reduce((sum, days) => sum + days, 0) + this.day
    );
  }

  getWeekOfYear() {
    const dayOfYear = this.getDayOfYear();
    return Math.ceil(dayOfYear / 7);
  }

  //is today,tomarow,yesterday,add day,mines day,date diff,
  static isToday(jy, jm, jd) {
    if (jy < 0 || jm < 0 || jm > 12 || jd < 0 || jd > 31) {
      throw new Error("isToday params is invalid");
    }
    const today = new Jalali(new Date());
    return (
      today.year === parseInt(jy) &&
      today.month === parseInt(jm) &&
      today.day === parseInt(jd)
    );
  }
  isToday() {
    return Jalali.isToday(this.year, this.month, this.day);
  }

  static addDays(jyear, jmonth, jday, days) {
    if (jyear < 0 || jmonth < 0 || jmonth > 12 || jday < 0 || jday > 31) {
      throw new Error("addDays params is invalid");
    }
    const { gy, gm, gd } = Jalali.toGregorian(jyear, jmonth, jday);
    const { jy, jm, jd } = Jalali.toJalali(gy, gm, gd + days);
    return { jy, jm, jd, jalaliDate: `${jy}/${jm}/${jd}` };
  }

  addDays(days) {
    return Jalali.addDays(this.year, this.month, this.day, days);
  }

  static removeDays(jyear, jmonth, jday, days) {
    if (
      jyear < 0 ||
      jmonth < 0 ||
      jmonth > 12 ||
      jday < 0 ||
      jday > 31 ||
      days < 0
    ) {
      throw new Error("addDays params is invalid");
    }
    const { gy, gm, gd } = Jalali.toGregorian(jyear, jmonth, jday);
    const { jy, jm, jd } = Jalali.toJalali(gy, gm, gd + days);
    return { jy, jm, jd, jalaliDate: `${jy}/${jm}/${jd}` };
  }

  removeDays(days) {
    return Jalali.addDays(this.year, this.month, this.day, days);
  }

  static addMonths(jyear, jmonth, jday, months) {
    if (jyear < 0 || jmonth < 0 || jmonth > 12 || jday < 0 || jday > 31) {
      throw new Error("addMonths params is invalid");
    }
    let jy;
    let jm;
    let jd;
    if (jmonth + months > 12) {
      jy = jyear + Math.floor((jmonth + months) / 12);
      jm = Math.floor((jmonth + months) % 12);
      jd = jday;
    } else {
      jy = jyear;
      jm = jmonth + months;
      jd = jday;
    }

    if (jm > 6 && jm < 12 && jd > 30) {
      jm += 1;
      jd = 1;
    }

    if (jm === 12 && jd === 30 && !Jalali.isJalaliLeap(jy)) {
      jm = 1;
      jd = 1;
      jy += 1;
    }

    if (jm === 12 && jd === 31 && !Jalali.isJalaliLeap(jy)) {
      jm = 1;
      jd = 2;
      jy += 1;
    }

    if (jm === 12 && jd === 31 && Jalali.isJalaliLeap(jy)) {
      jm = 1;
      jd = 1;
      jy += 1;
    }

    return { jy, jm, jd, jalaliDate: `${jy}/${jm}/${jd}` };
  }

  addMonths(months) {
    return Jalali.addMonths(this.year, this.month, this.day, months);
  }
}

// For Node.js environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = Jalali;
}
