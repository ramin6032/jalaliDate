/**
 * متدهای مربوط به هفته در تقویم جلالی
 */

import { DAY_NAMES } from "../constants";
import { addDays, getDayOfWeek, isToday } from "./DateUtils";

/**
 * دریافت اطلاعات هفته جاری
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @returns {Object} اطلاعات هفته
 */
export function getWeekInfo(jy, jm, jd) {
  const dayOfWeek = getDayOfWeek(jy, jm, jd);
  const weekStart = addDays(jy, jm, jd, -dayOfWeek);
  const weekEnd = addDays(jy, jm, jd, 6 - dayOfWeek);

  return {
    weekNumber: Math.ceil(getDayOfYear(jy, jm, jd) / 7),
    startDate: weekStart,
    endDate: weekEnd,
    days: Array.from({ length: 7 }, (_, i) => {
      const date = addDays(jy, jm, jd, i - dayOfWeek);
      return {
        date: date,
        dayName: DAY_NAMES[i],
        isToday: isToday(date.jy, date.jm, date.jd),
        isWeekend: i === 6, // جمعه
      };
    }),
  };
}

/**
 * دریافت تعداد روزهای کاری بین دو تاریخ
 * @param {number} jy1 - سال تاریخ اول
 * @param {number} jm1 - ماه تاریخ اول (1-12)
 * @param {number} jd1 - روز تاریخ اول
 * @param {number} jy2 - سال تاریخ دوم
 * @param {number} jm2 - ماه تاریخ دوم (1-12)
 * @param {number} jd2 - روز تاریخ دوم
 * @returns {number} تعداد روزهای کاری
 */
export function getWorkingDays(jy1, jm1, jd1, jy2, jm2, jd2) {
  const diff = getDateDifference(jy1, jm1, jd1, jy2, jm2, jd2);
  const totalDays = diff.totalDays;
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // محاسبه روزهای کاری (با در نظر گرفتن جمعه به عنوان تعطیل)
  const workingDays = weeks * 6; // 6 روز کاری در هر هفته

  // محاسبه روزهای کاری باقی‌مانده
  let currentDate = { jy: jy1, jm: jm1, jd: jd1 };
  for (let i = 0; i < remainingDays; i++) {
    const dayOfWeek = getDayOfWeek(
      currentDate.jy,
      currentDate.jm,
      currentDate.jd
    );
    if (dayOfWeek !== 6) {
      // اگر جمعه نباشد
      workingDays++;
    }
    currentDate = addDays(currentDate.jy, currentDate.jm, currentDate.jd, 1);
  }

  return workingDays;
}

// این توابع باید از فایل‌های دیگر import شوند
import { getDayOfYear, getDateDifference } from "./DateUtils";
