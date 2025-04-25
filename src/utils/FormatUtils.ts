import { JalaliDate, FormattedDate } from "../types";
import { toGregorian } from "./DateUtils";

const MONTH_NAMES = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const DAY_NAMES = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];

/**
 * فرمت کردن تاریخ شمسی
 * @param date تاریخ شمسی
 * @param format فرمت مورد نظر
 * @returns تاریخ فرمت شده
 */
export function formatDate(date: JalaliDate, format?: string): FormattedDate {
  const gregorian = toGregorian(date.year, date.month, date.day);
  const gDate = new Date(gregorian.year, gregorian.month - 1, gregorian.day);
  const dayOfWeek = gDate.getDay();

  const short = `${date.year}/${date.month}/${date.day}`;
  const medium = `${date.day} ${MONTH_NAMES[date.month - 1]} ${date.year}`;
  const long = `${DAY_NAMES[dayOfWeek]}، ${date.day} ${
    MONTH_NAMES[date.month - 1]
  } ${date.year}`;
  const full = `${DAY_NAMES[dayOfWeek]}، ${date.day} ${
    MONTH_NAMES[date.month - 1]
  } ${date.year} هجری شمسی`;
  const persian = `${date.year}年${date.month}月${date.day}日`;
  const words = `${date.day} روز از ماه ${MONTH_NAMES[date.month - 1]} سال ${
    date.year
  }`;

  return { short, medium, long, full, persian, words };
}

/**
 * تبدیل رشته به تاریخ شمسی
 * @param dateString رشته تاریخ
 * @param format فرمت تاریخ
 * @returns تاریخ شمسی
 */
export function parseDate(dateString: string, format?: string): JalaliDate {
  // TODO: پیاده‌سازی تبدیل رشته به تاریخ شمسی
  throw new Error("Not implemented");
}
