/**
 * متدهای مربوط به فصل‌ها در تقویم جلالی
 */

import { SEASONS } from "../constants";
import { getDateDifference } from "./DateUtils";

/**
 * دریافت فصل سال بر اساس ماه جلالی
 * @param {number} month - شماره ماه جلالی (1-12)
 * @returns {string} نام فصل
 */
export function getSeason(month) {
  if (month >= 1 && month <= 3) return SEASONS.SPRING;
  if (month >= 4 && month <= 6) return SEASONS.SUMMER;
  if (month >= 7 && month <= 9) return SEASONS.AUTUMN;
  return SEASONS.WINTER;
}

/**
 * دریافت تعداد روزهای باقی‌مانده تا پایان فصل
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @returns {number} تعداد روزهای باقی‌مانده
 */
export function getDaysUntilEndOfSeason(jy, jm, jd) {
  const season = getSeason(jm);
  let endMonth, endDay;

  switch (season) {
    case SEASONS.SPRING:
      endMonth = 3;
      endDay = 31;
      break;
    case SEASONS.SUMMER:
      endMonth = 6;
      endDay = 31;
      break;
    case SEASONS.AUTUMN:
      endMonth = 9;
      endDay = 30;
      break;
    case SEASONS.WINTER:
      endMonth = 12;
      endDay = isJalaliLeap(jy) ? 30 : 29;
      break;
  }

  const diff = getDateDifference(jy, jm, jd, jy, endMonth, endDay);
  return diff.totalDays;
}

// این تابع باید از فایل‌های دیگر import شود
import { isJalaliLeap } from "./DateUtils";
