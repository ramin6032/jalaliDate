import { JalaliDate, WeekInfo } from "../jalali";
import { getDayOfWeek } from "./DateUtils";
import { getDateDifference } from "./DateUtils";

/**
 * دریافت اطلاعات هفته
 * @param jy سال شمسی
 * @param jm ماه شمسی
 * @param jd روز شمسی
 * @returns اطلاعات هفته
 */
export function getWeekInfo(jy: number, jm: number, jd: number): WeekInfo {
  const currentDate: JalaliDate = { year: jy, month: jm, day: jd };
  const dayOfWeek = getDayOfWeek(jy, jm, jd);
  const daysToSubtract = dayOfWeek;
  const daysToAdd = 6 - dayOfWeek;

  const startDate: JalaliDate = { ...currentDate };
  const endDate: JalaliDate = { ...currentDate };

  // محاسبه تاریخ شروع هفته
  if (daysToSubtract > 0) {
    if (jd > daysToSubtract) {
      startDate.day = jd - daysToSubtract;
    } else {
      if (jm > 1) {
        startDate.month = jm - 1;
        startDate.day = 30;
      } else {
        startDate.year = jy - 1;
        startDate.month = 12;
        startDate.day = 29;
      }
    }
  }

  // محاسبه تاریخ پایان هفته
  if (daysToAdd > 0) {
    if (jd + daysToAdd <= 30) {
      endDate.day = jd + daysToAdd;
    } else {
      if (jm < 12) {
        endDate.month = jm + 1;
        endDate.day = daysToAdd - (30 - jd);
      } else {
        endDate.year = jy + 1;
        endDate.month = 1;
        endDate.day = daysToAdd - (30 - jd);
      }
    }
  }

  // محاسبه روزهای هفته
  const days: Array<{
    date: JalaliDate;
    isToday: boolean;
    isWeekend: boolean;
  }> = [];

  for (let i = 0; i < 7; i++) {
    const date: JalaliDate = { ...startDate };
    if (i > 0) {
      if (date.day < 30) {
        date.day++;
      } else {
        if (date.month < 12) {
          date.month++;
          date.day = 1;
        } else {
          date.year++;
          date.month = 1;
          date.day = 1;
        }
      }
    }

    days.push({
      date,
      isToday: date.year === jy && date.month === jm && date.day === jd,
      isWeekend: getDayOfWeek(date.year, date.month, date.day) === 5, // جمعه
    });
  }

  return {
    weekNumber: Math.ceil(getDateDifference(startDate, currentDate) / 7),
    startDate,
    endDate,
    days,
  };
}

/**
 * محاسبه تعداد روزهای کاری بین دو تاریخ
 * @param date1 تاریخ اول
 * @param date2 تاریخ دوم
 * @returns تعداد روزهای کاری
 */
export function getWorkingDays(date1: JalaliDate, date2: JalaliDate): number {
  const totalDays = getDateDifference(date1, date2);
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const weekendDays = weeks + (remainingDays > 5 ? remainingDays - 5 : 0);
  return totalDays - weekendDays;
}
