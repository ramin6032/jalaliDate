/**
 * کلاس Jalali برای کار با تقویم جلالی (شمسی/فارسی)
 * این کلاس امکان تبدیل بین تاریخ میلادی و جلالی را فراهم می‌کند
 * و امکانات مختلفی برای کار با تاریخ جلالی ارائه می‌دهد
 */
class Jalali {
  #gregorianDate;
  #gy;
  #gm;
  #gd;

  /**
   * آرایه ثابت تعداد روزهای هر ماه جلالی
   * @static
   */
  static DAYS_IN_MONTH = Object.freeze([
    31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29,
  ]);
  static MONTH_NAMES = Object.freeze([
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
  ]);
  static DAY_NAMES = Object.freeze([
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ]);

  /**
   * سازنده کلاس Jalali
   * @param {Date|number} gy - شیء Date یا سال میلادی
   * @param {number} [gm] - ماه میلادی (1-12)
   * @param {number} [gd] - روز میلادی
   * @param {string} [time="00:00:00"] - زمان به فرمت HH:MM:SS
   * @param {string} [format="YYYY/MM/DD"] - فرمت نمایش تاریخ
   * @throws {Error} در صورت ورود تاریخ نامعتبر
   */
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

  /**
   * تنظیم تاریخ و زمان
   * @param {string} date - تاریخ به فرمت رشته‌ای
   * @param {string} time - زمان به فرمت HH:MM:SS
   * @private
   * @throws {Error} در صورت ورود تاریخ یا زمان نامعتبر
   */
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

  /**
   * دریافت سال جلالی
   * @returns {number} سال جلالی
   */
  getYear() {
    return this.year;
  }

  /**
   * دریافت ماه جلالی
   * @returns {number} ماه جلالی (1-12)
   */
  getMonth() {
    return this.month;
  }

  /**
   * دریافت روز جلالی
   * @returns {number} روز جلالی
   */
  getDay() {
    return this.day;
  }

  /**
   * دریافت شماره روز هفته
   * @returns {number} شماره روز هفته (1 = شنبه، 2 = یکشنبه، ...، 7 = جمعه)
   */
  getDayOfWeek() {
    return this.dayOfWeekNumber;
  }

  /**
   * تبدیل تاریخ میلادی به جلالی
   * @param {number} gy - سال میلادی
   * @param {number} gm - ماه میلادی (1-12)
   * @param {number} gd - روز میلادی
   * @returns {Object} شیء حاوی سال، ماه و روز جلالی
   * @static
   */
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

  /**
   * تبدیل تاریخ جلالی به میلادی
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @returns {Object} شیء حاوی سال، ماه و روز میلادی
   * @static
   * @throws {Error} در صورت ورود روز نامعتبر برای ماه جلالی
   */
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

  /**
   * بررسی کبیسه بودن سال جلالی
   * @param {number} [jy] - سال جلالی (پیش‌فرض: سال فعلی)
   * @returns {boolean} آیا سال کبیسه است؟
   * @static
   */
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

  /**
   * بررسی کبیسه بودن سال جلالی (مترادف با isJalaliLeap)
   * @param {number} [jy] - سال جلالی (پیش‌فرض: سال فعلی)
   * @returns {boolean} آیا سال کبیسه است؟
   * @static
   */
  static isKabise(jy = new Jalali().year) {
    return Jalali.isJalaliLeap(jy);
  }

  /**
   * تنظیم فرمت نمایش تاریخ
   * @param {string} [format] - فرمت جدید (پیش‌فرض: فرمت فعلی)
   * @throws {Error} در صورت ورود فرمت نامعتبر
   */
  format(format = this.formatDate) {
    if (this.#validateFormat(format)) {
      this.formatDate = format;
      this.date = this.#DateToString();
    }
  }

  /**
   * اعتبارسنجی فرمت تاریخ
   * @param {string} formatString - فرمت مورد بررسی
   * @returns {boolean} آیا فرمت معتبر است؟
   * @private
   */
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

  /**
   * تبدیل تاریخ به رشته با فرمت مشخص شده
   * @returns {string} تاریخ به فرمت رشته‌ای
   * @private
   */
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

  /**
   * دریافت تعداد روزهای ماه جلالی
   * @param {number} year - سال جلالی
   * @param {number} month - ماه جلالی (1-12)
   * @returns {number} تعداد روزهای ماه
   * @static
   * @throws {Error} در صورت ورود ماه نامعتبر
   */
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

  /**
   * دریافت تعداد روزهای ماه جلالی فعلی
   * @returns {number} تعداد روزهای ماه
   */
  getDaysInMonth() {
    return Jalali.getDaysInMonth(this.year, this.month);
  }

  /**
   * دریافت تعداد روزهای سال جلالی
   * @param {number} [year] - سال جلالی (پیش‌فرض: سال فعلی)
   * @returns {number} تعداد روزهای سال (365 یا 366)
   * @static
   */
  static getDaysInYear(year) {
    return Jalali.isJalaliLeap(year) ? 366 : 365;
  }

  /**
   * دریافت تعداد روزهای سال جلالی فعلی
   * @returns {number} تعداد روزهای سال (365 یا 366)
   */
  getDaysInYear() {
    return Jalali.getDaysInYear(this.year);
  }

  /**
   * دریافت نام روز هفته به فارسی
   * @param {number} dayOfWeekNumber - شماره روز هفته (1-7)
   * @returns {string} نام فارسی روز هفته
   * @static
   * @throws {Error} در صورت ورود شماره روز نامعتبر
   */
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
    return days[Number(dayOfWeekNumber)];
  }

  /**
   * دریافت نام روز هفته فعلی به فارسی
   * @returns {string} نام فارسی روز هفته
   */
  getDayName() {
    return Jalali.getDayName(this.dayOfWeekNumber);
  }

  /**
   * دریافت نام ماه جلالی به فارسی
   * @param {number} dayOfMonth - شماره ماه جلالی (1-12)
   * @returns {string} نام فارسی ماه
   * @static
   * @throws {Error} در صورت ورود شماره ماه نامعتبر
   */
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

  /**
   * دریافت نام ماه جلالی فعلی به فارسی
   * @returns {string} نام فارسی ماه
   */
  getMonthName() {
    return Jalali.getMonthName(this.month);
  }

  /**
   * دریافت فصل سال بر اساس ماه جلالی
   * @param {number} month - شماره ماه جلالی (1-12)
   * @returns {string} نام فصل
   * @static
   * @throws {Error} در صورت ورود شماره ماه نامعتبر
   */
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

  /**
   * دریافت فصل سال بر اساس ماه جلالی فعلی
   * @returns {string} نام فصل
   */
  getSeason() {
    return Jalali.getSeason(this.month);
  }

  /**
   * دریافت شماره روز در سال جلالی
   * @returns {number} شماره روز در سال (1 تا 366)
   */
  getDayOfYear() {
    const daysInMonths = Jalali.DAYS_IN_MONTH.map((days, index) =>
      index === 11 && this.isJalaliLeap ? 30 : days
    );
    return (
      daysInMonths
        .slice(0, this.month - 1)
        .reduce((sum, days) => sum + days, 0) + this.day
    );
  }

  /**
   * دریافت شماره هفته در سال جلالی
   * @returns {number} شماره هفته در سال
   */
  getWeekOfYear() {
    const dayOfYear = this.getDayOfYear();
    return Math.ceil(dayOfYear / 7);
  }

  /**
   * بررسی امروز بودن تاریخ
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @returns {boolean} آیا تاریخ امروز است؟
   * @static
   * @throws {Error} در صورت ورود پارامترهای نامعتبر
   */
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

  /**
   * بررسی امروز بودن تاریخ فعلی
   * @returns {boolean} آیا تاریخ امروز است؟
   */
  isToday() {
    return Jalali.isToday(this.year, this.month, this.day);
  }

  /**
   * افزودن تعداد روز به تاریخ جلالی
   * @param {number} jyear - سال جلالی
   * @param {number} jmonth - ماه جلالی (1-12)
   * @param {number} jday - روز جلالی
   * @param {number} days - تعداد روز برای افزودن
   * @returns {Object} تاریخ جدید به صورت جلالی
   * @static
   * @throws {Error} در صورت ورود پارامترهای نامعتبر
   */
  static addDays(jyear, jmonth, jday, days) {
    if (jyear < 0 || jmonth < 0 || jmonth > 12 || jday < 0 || jday > 31) {
      throw new Error("addDays params is invalid");
    }
    const { gy, gm, gd } = Jalali.toGregorian(jyear, jmonth, jday);
    const { jy, jm, jd } = Jalali.toJalali(gy, gm, gd + days);
    return { jy, jm, jd, jalaliDate: `${jy}/${jm}/${jd}` };
  }

  /**
   * افزودن تعداد روز به تاریخ جلالی فعلی
   * @param {number} days - تعداد روز برای افزودن
   * @returns {Object} تاریخ جدید به صورت جلالی
   */
  addDays(days) {
    return Jalali.addDays(this.year, this.month, this.day, days);
  }

  /**
   * کم کردن تعداد روز از تاریخ جلالی
   * @param {number} jyear - سال جلالی
   * @param {number} jmonth - ماه جلالی (1-12)
   * @param {number} jday - روز جلالی
   * @param {number} days - تعداد روز برای کم کردن
   * @returns {Object} تاریخ جدید به صورت جلالی
   * @static
   * @throws {Error} در صورت ورود پارامترهای نامعتبر
   */
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

  /**
   * کم کردن تعداد روز از تاریخ جلالی فعلی
   * @param {number} days - تعداد روز برای کم کردن
   * @returns {Object} تاریخ جدید به صورت جلالی
   */
  removeDays(days) {
    return Jalali.removeDays(this.year, this.month, this.day, days);
  }

  /**
   * افزودن تعداد ماه به تاریخ جلالی
   * @param {number} jyear - سال جلالی
   * @param {number} jmonth - ماه جلالی (1-12)
   * @param {number} jday - روز جلالی
   * @param {number} months - تعداد ماه برای افزودن
   * @returns {Object} تاریخ جدید به صورت جلالی
   * @static
   * @throws {Error} در صورت ورود پارامترهای نامعتبر
   */
  static addMonths(jyear, jmonth, jday, months) {
    if (jyear < 0 || jmonth < 0 || jmonth > 12 || jday < 0 || jday > 31) {
      throw new Error("addMonths params is invalid");
    }
    const jy = jyear;
    const jm = jmonth + months;
    const jd = jday;

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

  /**
   * افزودن تعداد ماه به تاریخ جلالی فعلی
   * @param {number} months - تعداد ماه برای افزودن
   * @returns {Object} تاریخ جدید به صورت جلالی
   */
  addMonths(months) {
    return Jalali.addMonths(this.year, this.month, this.day, months);
  }
}

// برای محیط Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = Jalali;
}
