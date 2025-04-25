import { MONTH_NAMES } from "../constants";
import { dateToWords } from "./NumberConverter";
import { JalaliDate } from "../jalali";

/**
 * محاسبه روز هفته
 * @param jy سال شمسی
 * @param jm ماه شمسی
 * @param jd روز شمسی
 * @returns شماره روز هفته (0 تا 6)
 */
export function getDayOfWeek(jy: number, jm: number, jd: number): number {
  const gregorian = toGregorian(jy, jm, jd);
  const date = new Date(gregorian.year, gregorian.month - 1, gregorian.day);
  return date.getDay();
}

/**
 * محاسبه روز سال
 * @param jy سال شمسی
 * @param jm ماه شمسی
 * @param jd روز شمسی
 * @returns شماره روز سال
 */
export function getDayOfYear(jy: number, jm: number, jd: number): number {
  const jDaysInMonth = [
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
    isLeapYear(jy) ? 30 : 29,
  ];
  let dayOfYear = jd;

  for (let i = 0; i < jm - 1; i++) {
    dayOfYear += jDaysInMonth[i];
  }

  return dayOfYear;
}

/**
 * بررسی سال کبیسه شمسی
 * @param jy سال شمسی
 * @returns true اگر سال کبیسه باشد
 */
export function isJalaliLeap(jy: number): boolean {
  return jalCal(jy + 1).march - jalCal(jy).march === 366;
}

/**
 * دریافت فصل
 */
export function getSeason(month: number): string {
  if (month >= 1 && month <= 3) return "بهار";
  if (month >= 4 && month <= 6) return "تابستان";
  if (month >= 7 && month <= 9) return "پاییز";
  return "زمستان";
}

/**
 * محاسبه تفاضل دو تاریخ
 * @param jy1 سال شمسی اول
 * @param jm1 ماه شمسی اول
 * @param jd1 روز شمسی اول
 * @param jy2 سال شمسی دوم
 * @param jm2 ماه شمسی دوم
 * @param jd2 روز شمسی دوم
 * @returns تعداد روزهای بین دو تاریخ
 */
export function getDateDifference(
  jy1: number,
  jm1: number,
  jd1: number,
  jy2: number,
  jm2: number,
  jd2: number
): number {
  const g1 = g2d(jy1, jm1, jd1);
  const g2 = g2d(jy2, jm2, jd2);
  return g2 - g1;
}

/**
 * تبدیل تاریخ میلادی به شمسی
 * @param gy سال میلادی
 * @param gm ماه میلادی
 * @param gd روز میلادی
 * @returns تاریخ شمسی
 */
export function toJalali(gy: number, gm: number, gd: number): JalaliDate {
  const jy = gy - 621;
  const r = jalCal(jy);
  const gy2 = g2d(gy, gm, gd);
  let jd = g2d(r.gy, 3, r.march);
  let jy1 = jy - 1;
  let k = 0;
  let jd1 = 0;
  let jm1 = 0;
  let jd2 = 0;
  let jm2 = 0;

  if (gy2 >= jd) {
    k = 0;
    jd1 = jd;
    jm1 = 3;
    jy1 = jy;
  } else {
    k = 1;
    jd1 = g2d(r.gy - 1, 3, r.march);
    jm1 = 3;
    jy1 = jy - 1;
  }

  jd2 = gy2;
  jm2 = gm;
  const jdn = jd2 - jd1;

  if (k === 0) {
    if (jdn <= 186) {
      jm2 = 1 + div(jdn, 31);
      jd2 = mod(jdn, 31) + 1;
    } else {
      jm2 = 7 + div(jdn - 186, 30);
      jd2 = mod(jdn - 186, 30) + 1;
    }
  } else {
    if (jdn <= 186) {
      jm2 = 1 + div(jdn, 31);
      jd2 = mod(jdn, 31) + 1;
    } else {
      jm2 = 7 + div(jdn - 186, 30);
      jd2 = mod(jdn - 186, 30) + 1;
    }
  }

  return { year: jy1, month: jm2, day: jd2 };
}

/**
 * تبدیل تاریخ شمسی به میلادی
 * @param jy سال شمسی
 * @param jm ماه شمسی
 * @param jd روز شمسی
 * @returns تاریخ میلادی
 */
export function toGregorian(
  jy: number,
  jm: number,
  jd: number
): { year: number; month: number; day: number } {
  const r = jalCal(jy);
  const gy2 = g2d(r.gy, 3, r.march);
  let gy = 0;
  let gm = 0;
  let gd = 0;

  if (jm < 7) {
    gy = jy;
    gm = jm;
    gd = jd;
  } else {
    gy = jy + 1;
    gm = jm - 6;
    gd = jd;
  }

  const gy1 = gy - 1;
  const gy2 = g2d(gy, gm, gd);
  const jd1 = g2d(r.gy, 3, r.march);
  const jdn = jd1 + (jd - 1);

  if (jdn <= 186) {
    gy = r.gy;
    gm = 3 + div(jdn - 1, 31);
    gd = mod(jdn - 1, 31) + 1;
  } else {
    gy = r.gy + 1;
    gm = 9 + div(jdn - 187, 30);
    gd = mod(jdn - 187, 30) + 1;
  }

  return { year: gy, month: gm, day: gd };
}

/**
 * محاسبه تاریخ شمسی
 * @param jy سال شمسی
 * @returns اطلاعات تاریخ شمسی
 */
function jalCal(jy: number): { gy: number; march: number } {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
    2192, 2262, 2324, 2394, 2456, 3178,
  ];
  const bl = breaks.length;
  const gy = jy + 621;
  let leapJ = -14;
  let jp = breaks[0];
  let jm = 0;
  let jump = 0;
  let leap = 0;
  let n = 0;
  let i;

  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalali year " + jy);
  }

  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
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

  leap = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leap;

  return { gy, march };
}

/**
 * تبدیل تاریخ میلادی به روز جولیان
 * @param gy سال میلادی
 * @param gm ماه میلادی
 * @param gd روز میلادی
 * @returns روز جولیان
 */
function g2d(gy: number, gm: number, gd: number): number {
  let d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

/**
 * تقسیم صحیح
 * @param a عدد اول
 * @param b عدد دوم
 * @returns حاصل تقسیم صحیح
 */
function div(a: number, b: number): number {
  return ~~(a / b);
}

/**
 * باقیمانده تقسیم
 * @param a عدد اول
 * @param b عدد دوم
 * @returns باقیمانده تقسیم
 */
function mod(a: number, b: number): number {
  return a - ~~(a / b) * b;
}

/**
 * بررسی سال کبیسه میلادی
 * @param year سال میلادی
 * @returns true اگر سال کبیسه باشد
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
