/**
 * کلاس اصلی برای کار با تاریخ جلالی
 */

import { toJalali, toGregorian } from "../utils/DateConverter";
import { formatDate, getFormattedDate } from "../utils/DateFormatter";
import { getSeason, getDaysUntilEndOfSeason } from "../utils/SeasonUtils";
import { getWeekInfo, getWorkingDays } from "../utils/WeekUtils";
import { getMonthInfo, getDaysUntilEndOfMonth } from "../utils/MonthUtils";
import { getYearInfo, getDaysUntilEndOfYear } from "../utils/YearUtils";
import { dateToWords } from "../utils/NumberConverter";
import { DAY_NAMES, MONTH_NAMES, SPECIAL_DAYS } from "../constants";

export class Jalali {
  /**
   * تبدیل تاریخ میلادی به جلالی
   * @param {number} gy - سال میلادی
   * @param {number} gm - ماه میلادی (1-12)
   * @param {number} gd - روز میلادی
   * @returns {Object} تاریخ جلالی
   */
  static toJalali(gy, gm, gd) {
    return toJalali(gy, gm, gd);
  }

  /**
   * تبدیل تاریخ جلالی به میلادی
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @returns {Object} تاریخ میلادی
   */
  static toGregorian(jy, jm, jd) {
    return toGregorian(jy, jm, jd);
  }

  /**
   * فرمت‌بندی تاریخ جلالی
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @param {string} format - فرمت مورد نظر
   * @returns {string} تاریخ فرمت‌شده
   */
  static formatDate(jy, jm, jd, format) {
    return formatDate(jy, jm, jd, format);
  }

  /**
   * دریافت تاریخ جلالی به صورت کلمه
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @returns {string} تاریخ به صورت کلمه
   */
  static dateToWords(jy, jm, jd) {
    return dateToWords(jy, jm, jd);
  }

  /**
   * دریافت اطلاعات فصل
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @returns {Object} اطلاعات فصل
   */
  static getSeason(jy, jm, jd) {
    return getSeason(jm);
  }

  /**
   * دریافت تعداد روزهای باقی‌مانده تا پایان فصل
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @returns {number} تعداد روزهای باقی‌مانده
   */
  static getDaysUntilEndOfSeason(jy, jm, jd) {
    return getDaysUntilEndOfSeason(jy, jm, jd);
  }

  /**
   * دریافت اطلاعات هفته
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @returns {Object} اطلاعات هفته
   */
  static getWeekInfo(jy, jm, jd) {
    return getWeekInfo(jy, jm, jd);
  }

  /**
   * دریافت تعداد روزهای کاری بین دو تاریخ
   * @param {number} jy1 - سال جلالی اول
   * @param {number} jm1 - ماه جلالی اول (1-12)
   * @param {number} jd1 - روز جلالی اول
   * @param {number} jy2 - سال جلالی دوم
   * @param {number} jm2 - ماه جلالی دوم (1-12)
   * @param {number} jd2 - روز جلالی دوم
   * @returns {number} تعداد روزهای کاری
   */
  static getWorkingDays(jy1, jm1, jd1, jy2, jm2, jd2) {
    return getWorkingDays(jy1, jm1, jd1, jy2, jm2, jd2);
  }

  /**
   * دریافت اطلاعات ماه
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @returns {Object} اطلاعات ماه
   */
  static getMonthInfo(jy, jm) {
    return getMonthInfo(jy, jm);
  }

  /**
   * دریافت تعداد روزهای باقی‌مانده تا پایان ماه
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @returns {number} تعداد روزهای باقی‌مانده
   */
  static getDaysUntilEndOfMonth(jy, jm, jd) {
    return getDaysUntilEndOfMonth(jy, jm, jd);
  }

  /**
   * دریافت اطلاعات سال
   * @param {number} jy - سال جلالی
   * @returns {Object} اطلاعات سال
   */
  static getYearInfo(jy) {
    return getYearInfo(jy);
  }

  /**
   * دریافت تعداد روزهای باقی‌مانده تا پایان سال
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @returns {number} تعداد روزهای باقی‌مانده
   */
  static getDaysUntilEndOfYear(jy, jm, jd) {
    return getDaysUntilEndOfYear(jy, jm, jd);
  }

  /**
   * دریافت اطلاعات تاریخ به صورت فرمت‌شده
   * @param {number} jy - سال جلالی
   * @param {number} jm - ماه جلالی (1-12)
   * @param {number} jd - روز جلالی
   * @returns {Object} اطلاعات تاریخ به صورت فرمت‌شده
   */
  static getFormattedDate(jy, jm, jd) {
    return getFormattedDate(jy, jm, jd);
  }

  /**
   * دریافت روزهای هفته
   * @returns {string[]} نام روزهای هفته
   */
  static get DAY_NAMES() {
    return DAY_NAMES;
  }

  /**
   * دریافت نام ماه‌ها
   * @returns {string[]} نام ماه‌ها
   */
  static get MONTH_NAMES() {
    return MONTH_NAMES;
  }

  /**
   * دریافت روزهای خاص
   * @returns {Object} روزهای خاص
   */
  static get SPECIAL_DAYS() {
    return SPECIAL_DAYS;
  }
}
