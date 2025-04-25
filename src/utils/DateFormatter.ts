import { JalaliDate, FormattedDate } from "../jalali";
import { DAY_NAMES, MONTH_NAMES } from "../constants";
import { getDayOfWeek } from "./DateUtils";
import { toPersianNumbers, toEnglishNumbers } from "./NumberUtils";
import { dateToWords } from "./NumberConverter";

/**
 * فرمت‌بندی تاریخ شمسی
 * @param jy سال شمسی
 * @param jm ماه شمسی
 * @param jd روز شمسی
 * @param format فرمت مورد نظر
 * @returns تاریخ فرمت شده
 */
export function formatDate(
  jy: number,
  jm: number,
  jd: number,
  format: string
): string {
  const tokens: { [key: string]: string } = {
    YYYY: jy.toString(),
    MM: jm.toString().padStart(2, "0"),
    DD: jd.toString().padStart(2, "0"),
    MMM: MONTH_NAMES[jm - 1],
    DDD: DAY_NAMES[getDayOfWeek(jy, jm, jd)],
  };

  let result = format;
  for (const [token, value] of Object.entries(tokens)) {
    result = result.replace(token, value);
  }

  return result;
}

/**
 * تبدیل اعداد انگلیسی به فارسی
 */
export function toPersianNumbers(str: string): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (d) => persianNumbers[parseInt(d)]);
}

/**
 * تبدیل اعداد فارسی به انگلیسی
 */
export function toEnglishNumbers(str: string): string {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
}

/**
 * دریافت تاریخ فرمت شده به صورت‌های مختلف
 * @param jy سال شمسی
 * @param jm ماه شمسی
 * @param jd روز شمسی
 * @returns تاریخ فرمت شده به صورت‌های مختلف
 */
export function getFormattedDate(
  jy: number,
  jm: number,
  jd: number
): FormattedDate {
  return {
    short: formatDate(jy, jm, jd, "YYYY/MM/DD"),
    medium: formatDate(jy, jm, jd, "DD MMM YYYY"),
    long: formatDate(jy, jm, jd, "DDDD DD MMMM YYYY"),
    full: formatDate(jy, jm, jd, "DDDD DD MMMM YYYY"),
    persian: toPersianNumbers(formatDate(jy, jm, jd, "YYYY/MM/DD")),
    words: dateToWords(jy, jm, jd),
  };
}
