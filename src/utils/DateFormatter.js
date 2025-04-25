/**
 * متدهای فرمت‌بندی تاریخ جلالی
 */

import { DAY_NAMES, MONTH_NAMES } from "../constants";

/**
 * فرمت‌بندی پیشرفته تاریخ جلالی
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @param {string} format - فرمت مورد نظر
 * @returns {string} تاریخ فرمت‌شده
 */
export function formatDate(jy, jm, jd, format = "YYYY/MM/DD") {
  const tokens = {
    YYYY: jy,
    YY: String(jy).slice(-2),
    MM: String(jm).padStart(2, "0"),
    M: jm,
    DD: String(jd).padStart(2, "0"),
    D: jd,
    ddd: DAY_NAMES[getDayOfWeek(jy, jm, jd)],
    MMM: MONTH_NAMES[jm - 1],
    season: getSeason(jm),
    dayOfYear: getDayOfYear(jy, jm, jd),
    weekOfYear: Math.ceil(getDayOfYear(jy, jm, jd) / 7),
    isLeapYear: isJalaliLeap(jy) ? "کبیسه" : "عادی",
  };

  return format.replace(
    /(YYYY|YY|MM|M|DD|D|ddd|MMM|season|dayOfYear|weekOfYear|isLeapYear)/g,
    (match) => tokens[match]
  );
}

/**
 * تبدیل اعداد انگلیسی به فارسی
 * @param {string} str - رشته شامل اعداد انگلیسی
 * @returns {string} رشته با اعداد فارسی
 */
export function toPersianNumbers(str) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (d) => persianNumbers[d]);
}

/**
 * تبدیل اعداد فارسی به انگلیسی
 * @param {string} str - رشته شامل اعداد فارسی
 * @returns {string} رشته با اعداد انگلیسی
 */
export function toEnglishNumbers(str) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (d) => persianNumbers.indexOf(d));
}

/**
 * دریافت تاریخ به فرمت‌های مختلف
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @returns {Object} تاریخ به فرمت‌های مختلف
 */
export function getFormattedDate(jy, jm, jd) {
  return {
    short: formatDate(jy, jm, jd, "YYYY/MM/DD"),
    medium: formatDate(jy, jm, jd, "ddd, DD MMM YYYY"),
    long: formatDate(jy, jm, jd, "DD MMM YYYY, ddd"),
    full: formatDate(jy, jm, jd, "DD MMM YYYY, ddd - فصل season"),
    persian: toPersianNumbers(formatDate(jy, jm, jd, "YYYY/MM/DD")),
    words: dateToWords(jy, jm, jd),
  };
}

// این توابع باید از فایل‌های دیگر import شوند
import {
  getDayOfWeek,
  getDayOfYear,
  isJalaliLeap,
  getSeason,
  dateToWords,
} from "./index.js";

/**
 * متدهای فرمت‌بندی تاریخ جلالی
 */

import { DAY_NAMES, MONTH_NAMES } from "../constants";

/**
 * فرمت‌بندی پیشرفته تاریخ جلالی
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @param {string} format - فرمت مورد نظر
 * @returns {string} تاریخ فرمت‌شده
 */
export function formatDate(jy, jm, jd, format = "YYYY/MM/DD") {
  const tokens = {
    YYYY: jy,
    YY: String(jy).slice(-2),
    MM: String(jm).padStart(2, "0"),
    M: jm,
    DD: String(jd).padStart(2, "0"),
    D: jd,
    ddd: DAY_NAMES[getDayOfWeek(jy, jm, jd)],
    MMM: MONTH_NAMES[jm - 1],
    season: getSeason(jm),
    dayOfYear: getDayOfYear(jy, jm, jd),
    weekOfYear: Math.ceil(getDayOfYear(jy, jm, jd) / 7),
    isLeapYear: isJalaliLeap(jy) ? "کبیسه" : "عادی",
  };

  return format.replace(
    /(YYYY|YY|MM|M|DD|D|ddd|MMM|season|dayOfYear|weekOfYear|isLeapYear)/g,
    (match) => tokens[match]
  );
}

/**
 * تبدیل اعداد انگلیسی به فارسی
 * @param {string} str - رشته شامل اعداد انگلیسی
 * @returns {string} رشته با اعداد فارسی
 */
export function toPersianNumbers(str) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (d) => persianNumbers[d]);
}

/**
 * تبدیل اعداد فارسی به انگلیسی
 * @param {string} str - رشته شامل اعداد فارسی
 * @returns {string} رشته با اعداد انگلیسی
 */
export function toEnglishNumbers(str) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (d) => persianNumbers.indexOf(d));
}

/**
 * دریافت تاریخ به فرمت‌های مختلف
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @returns {Object} تاریخ به فرمت‌های مختلف
 */
export function getFormattedDate(jy, jm, jd) {
  return {
    short: formatDate(jy, jm, jd, "YYYY/MM/DD"),
    medium: formatDate(jy, jm, jd, "ddd, DD MMM YYYY"),
    long: formatDate(jy, jm, jd, "DD MMM YYYY, ddd"),
    full: formatDate(jy, jm, jd, "DD MMM YYYY, ddd - فصل season"),
    persian: toPersianNumbers(formatDate(jy, jm, jd, "YYYY/MM/DD")),
    words: dateToWords(jy, jm, jd),
  };
}

// این توابع باید از فایل‌های دیگر import شوند
import {
  getDayOfWeek,
  getDayOfYear,
  isJalaliLeap,
  getSeason,
  dateToWords,
} from "./index.js";
