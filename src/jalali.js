class Jalali {
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

      this.year = jalaliDate[0];
      this.month = jalaliDate[1];
      this.day = jalaliDate[2];
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

    return [jy, jm + 1, jd];
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
  static isToday() {
    const today = new Jalali(new Date()); // Convert current Gregorian date to Jalali
    return (
      this.year === today.year &&
      this.month === today.month &&
      this.day === today.day
    );
  }
}

// For Node.js environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = Jalali;
}
