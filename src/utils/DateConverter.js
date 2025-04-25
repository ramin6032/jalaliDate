/**
 * متدهای تبدیل تاریخ بین جلالی و میلادی
 */

/**
 * تبدیل تاریخ میلادی به جلالی
 * @param {number} gy - سال میلادی
 * @param {number} gm - ماه میلادی (1-12)
 * @param {number} gd - روز میلادی
 * @returns {Object} شیء حاوی سال، ماه و روز جلالی
 */
export function toJalali(gy, gm, gd) {
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
 * @throws {Error} در صورت ورود روز نامعتبر برای ماه جلالی
 */
export function toGregorian(jy, jm, jd) {
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
}

/**
 * تبدیل روز سال به تاریخ میلادی
 * @param {number} year - سال میلادی
 * @param {number} dayOfYear - روز سال
 * @returns {Object} شیء حاوی سال، ماه و روز میلادی
 * @private
 */
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
