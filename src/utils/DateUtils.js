/**
 * متدهای مربوط به تاریخ در تقویم جلالی
 */

import { DAYS_IN_MONTH } from "../constants";

/**
 * محاسبه روز هفته برای تاریخ جلالی
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @returns {number} روز هفته (0-6)
 */
export function getDayOfWeek(jy, jm, jd) {
  const r = jalCal(jy);
  return mod(jd + r.monthStart, 7);
}

/**
 * محاسبه روز سال برای تاریخ جلالی
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @returns {number} روز سال (1-366)
 */
export function getDayOfYear(jy, jm, jd) {
  let dayOfYear = jd;
  for (let i = 1; i < jm; i++) {
    dayOfYear += DAYS_IN_MONTH[i - 1];
  }
  if (isJalaliLeap(jy) && jm > 6) {
    dayOfYear += 1;
  }
  return dayOfYear;
}

/**
 * بررسی کبیسه بودن سال جلالی
 * @param {number} jy - سال جلالی
 * @returns {boolean} آیا سال کبیسه است
 */
export function isJalaliLeap(jy) {
  return jalCal(jy).leap === 1;
}

/**
 * محاسبه تفاضل دو تاریخ جلالی
 * @param {number} jy1 - سال جلالی اول
 * @param {number} jm1 - ماه جلالی اول (1-12)
 * @param {number} jd1 - روز جلالی اول
 * @param {number} jy2 - سال جلالی دوم
 * @param {number} jm2 - ماه جلالی دوم (1-12)
 * @param {number} jd2 - روز جلالی دوم
 * @returns {number} تعداد روزهای بین دو تاریخ
 */
export function getDateDifference(jy1, jm1, jd1, jy2, jm2, jd2) {
  const day1 = getDayOfYear(jy1, jm1, jd1);
  const day2 = getDayOfYear(jy2, jm2, jd2);
  let diff = 0;

  if (jy1 === jy2) {
    diff = day2 - day1;
  } else {
    const daysInYear1 = isJalaliLeap(jy1) ? 366 : 365;
    diff = daysInYear1 - day1 + day2;
    for (let year = jy1 + 1; year < jy2; year++) {
      diff += isJalaliLeap(year) ? 366 : 365;
    }
  }

  return diff;
}

/**
 * محاسبه تقویم جلالی
 * @param {number} jy - سال جلالی
 * @returns {Object} اطلاعات تقویم جلالی
 */
function jalCal(jy) {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
    2192, 2262, 2324, 2394, 2456, 3178,
  ];
  const bl = breaks.length;
  const gy = jy + 621;
  let leapJ = -14;
  let jp = breaks[0];
  let jm, jn, jump, leap, leapG, march, n, i;

  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalali year " + jy);
  }

  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jn = breaks[i + 1];
    jump = jn - jm;
    if (jy < jm) {
      break;
    }
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }

  n = jy - jp;
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) {
    leapJ += 1;
  }

  leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  march = 20 + leapJ - leapG;

  return {
    leap: mod(mod(n + 1, 33) - 1, 4),
    gy,
    march,
    monthStart: mod(march + 1, 7),
  };
}

/**
 * محاسبه باقیمانده تقسیم
 * @param {number} a - عدد اول
 * @param {number} b - عدد دوم
 * @returns {number} باقیمانده
 */
function mod(a, b) {
  return a - b * div(a, b);
}

/**
 * محاسبه تقسیم صحیح
 * @param {number} a - عدد اول
 * @param {number} b - عدد دوم
 * @returns {number} حاصل تقسیم صحیح
 */
function div(a, b) {
  return ~~(a / b);
}
