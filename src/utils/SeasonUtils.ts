import { JalaliDate } from "../jalali";
import { getDateDifference } from "./DateUtils";

/**
 * دریافت فصل بر اساس ماه
 * @param month ماه شمسی (1 تا 12)
 * @returns نام فصل
 */
export function getSeason(month: number): string {
  if (month >= 1 && month <= 3) return "بهار";
  if (month >= 4 && month <= 6) return "تابستان";
  if (month >= 7 && month <= 9) return "پاییز";
  if (month >= 10 && month <= 12) return "زمستان";
  throw new Error("ماه باید بین 1 و 12 باشد");
}

/**
 * محاسبه تعداد روزهای باقیمانده تا پایان فصل
 * @param jy سال شمسی
 * @param jm ماه شمسی
 * @param jd روز شمسی
 * @returns تعداد روزهای باقیمانده
 */
export function getDaysUntilEndOfSeason(
  jy: number,
  jm: number,
  jd: number
): number {
  const currentDate: JalaliDate = { year: jy, month: jm, day: jd };
  const season = getSeason(jm);
  let endDate: JalaliDate;

  switch (season) {
    case "بهار":
      endDate = { year: jy, month: 3, day: 31 };
      break;
    case "تابستان":
      endDate = { year: jy, month: 6, day: 31 };
      break;
    case "پاییز":
      endDate = { year: jy, month: 9, day: 30 };
      break;
    case "زمستان":
      endDate = { year: jy, month: 12, day: 29 };
      break;
    default:
      throw new Error("فصل نامعتبر است");
  }

  return getDateDifference(currentDate, endDate);
}
