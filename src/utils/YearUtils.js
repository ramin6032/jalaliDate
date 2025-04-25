/**
 * متدهای مربوط به سال در تقویم جلالی
 */

import { getMonthInfo } from './MonthUtils';
import { getDayOfYear } from './DateUtils';

/**
 * دریافت اطلاعات کامل سال
 * @param {number} jy - سال جلالی
 * @returns {Object} اطلاعات کامل سال
 */
export function getYearInfo(jy) {
  const months = Array.from({ length: 12 }, (_, i) =>
    getMonthInfo(jy, i + 1)
  );
  const totalDays = isJalaliLeap(jy) ? 366 : 365;
  const weeks = Math.ceil(totalDays / 7);

  return {
    year: jy,
    isLeapYear: isJalaliLeap(jy),
    totalDays,
    weeks,
    months,
    seasons: {
      spring: months.slice(0, 3),
      summer: months.slice(3, 6),
      autumn: months.slice(6, 9),
      winter: months.slice(9, 12),
    },
  };
}

/**
 * دریافت تعداد روزهای باقی‌مانده تا پایان سال
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @returns {number} تعداد روزهای باقی‌مانده
 */
export function getDaysUntilEndOfYear(jy, jm, jd) {
  const dayOfYear = getDayOfYear(jy, jm, jd);
  const totalDays = isJalaliLeap(jy) ? 366 : 365;
  return totalDays - dayOfYear;
}

// این تابع باید از فایل‌های دیگر import شود
import { isJalaliLeap } from './DateUtils';
} 