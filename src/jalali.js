class Jalali {
  constructor(gy, gm, gd, time, format) {
    // if (!(gregorianDate instanceof Date) || isNaN(gregorianDate)) {
    //   throw new Error("Invalid Gregorian Date provided.");
    // }

    if (arguments.length === 1 && arguments[0] instanceof Date) {
      const gregorianDate = gy;
      const gregorianYear = gregorianDate.getFullYear();
      const gregorianMonth = gregorianDate.getMonth() + 1; // ماه در جاوااسکریپت از 0 شروع می‌شود
      const gregorianDay = gregorianDate.getDate();

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
      this.isKabise = Jalali.isKabise(this.year);
      this.isJalaliLeap = Jalali.isJalaliLeap(this.year);
      this.formatDate = this.#validateFormat(format) ? format : "YYYY/MM/DD";
      this.date = this.#DateToString();
      this.time = `${hours}:${minutes}:${seconds}`;
      this.#setDateTime(this.date, this.time);
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

  //   /**
  //    * Format the date as a string
  //    * @param {string} format - Optional format string (default: 'YYYY/MM/DD')
  //    * @returns {string} formatted date
  //    */
  //   format(format = "YYYY/MM/DD") {
  //     const y = this.year.toString();
  //     const m = this.month < 10 ? `0${this.month}` : this.month.toString();
  //     const d = this.day < 10 ? `0${this.day}` : this.day.toString();

  //     let result = format;
  //     result = result.replace("YYYY", y);
  //     result = result.replace("MM", m);
  //     result = result.replace("DD", d);

  //     return result;
  //   }

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

  //   static isGregorianLeap(gy = new Jalali().year) {
  //     return (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0;
  //   }

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
}

// For Node.js environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = Jalali;
}
