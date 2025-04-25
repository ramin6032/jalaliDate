/**
 * متدهای مربوط به ماه در تقویم جلالی
 */

import { DAYS_IN_MONTH, MONTH_NAMES } from "../constants";
import { getDayOfWeek, isToday } from "./DateUtils";

/**
 * دریافت اطلاعات کامل ماه
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @returns {Object} اطلاعات کامل ماه
 */
export function getMonthInfo(jy, jm) {
  const daysInMonth = getDaysInMonth(jy, jm);
  const firstDay = getDayOfWeek(jy, jm, 1);
  const lastDay = getDayOfWeek(jy, jm, daysInMonth);

  const weeks = Math.ceil((firstDay + daysInMonth) / 7);
  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    dayName: DAY_NAMES[(firstDay + i) % 7],
    isToday: isToday(jy, jm, i + 1),
    isWeekend: (firstDay + i) % 7 === 6,
  }));

  return {
    year: jy,
    month: jm,
    monthName: MONTH_NAMES[jm - 1],
    daysInMonth,
    firstDay,
    lastDay,
    weeks,
    days,
    season: getSeason(jm),
    isLeapYear: isJalaliLeap(jy),
  };
}

/**
 * دریافت تعداد روزهای ماه جلالی
 * @param {number} year - سال جلالی
 * @param {number} month - ماه جلالی (1-12)
 * @returns {number} تعداد روزهای ماه
 * @throws {Error} در صورت ورود ماه نامعتبر
 */
export function getDaysInMonth(year, month) {
  if (month < 1 || month > 12) {
    throw new Error("Month must be between 1 and 12");
  }

  // First 6 months have 31 days
  if (month <= 6) return 31;

  // Months 7-11 have 30 days
  if (month < 12) return 30;

  // Last month (12) has 29 days in normal years and 30 days in leap years
  return isJalaliLeap(year) ? 30 : 29;
}

/**
 * دریافت تعداد روزهای باقی‌مانده تا پایان ماه
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @returns {number} تعداد روزهای باقی‌مانده
 */
export function getDaysUntilEndOfMonth(jy, jm, jd) {
  const daysInMonth = getDaysInMonth(jy, jm);
  return daysInMonth - jd;
}

// این توابع باید از فایل‌های دیگر import شوند
import { getSeason, isJalaliLeap } from "./DateUtils";

import { DAY_NAMES } from "../constants";

export function getMonthInfo(jy, jm) {
  const daysInMonth = getDaysInMonth(jy, jm);
  const firstDay = getDayOfWeek(jy, jm, 1);
  const lastDay = getDayOfWeek(jy, jm, daysInMonth);

  const weeks = Math.ceil((firstDay + daysInMonth) / 7);
  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    dayName: DAY_NAMES[(firstDay + i) % 7],
    isToday: isToday(jy, jm, i + 1),
    isWeekend: (firstDay + i) % 7 === 6,
  }));

  return {
    year: jy,
    month: jm,
    monthName: MONTH_NAMES[jm - 1],
    daysInMonth,
    firstDay,
    lastDay,
    weeks,
    days,
    season: getSeason(jm),
    isLeapYear: isJalaliLeap(jy),
  };
}

export function getDaysInMonth(year, month) {
  if (month < 1 || month > 12) {
    throw new Error("Month must be between 1 and 12");
  }

  // First 6 months have 31 days
  if (month <= 6) return 31;

  // Months 7-11 have 30 days
  if (month < 12) return 30;

  // Last month (12) has 29 days in normal years and 30 days in leap years
  return isJalaliLeap(year) ? 30 : 29;
}

export function getDaysUntilEndOfMonth(jy, jm, jd) {
  const daysInMonth = getDaysInMonth(jy, jm);
  return daysInMonth - jd;
}
