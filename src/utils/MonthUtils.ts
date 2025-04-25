import { JalaliDate, MonthInfo } from "../jalali";
import { DAYS_IN_MONTH } from "../constants";
import { getSeason } from "./SeasonUtils";
import { isJalaliLeap } from "./DateUtils";
import { getDayOfWeek } from "./DateUtils";

/**
 * دریافت اطلاعات ماه
 * @param jy سال شمسی
 * @param jm ماه شمسی
 * @returns اطلاعات ماه
 */
export function getMonthInfo(jy: number, jm: number): MonthInfo {
  const daysInMonth =
    jm === 12 && isJalaliLeap(jy) ? 30 : DAYS_IN_MONTH[jm - 1];
  const firstDay: JalaliDate = { year: jy, month: jm, day: 1 };
  const lastDay: JalaliDate = { year: jy, month: jm, day: daysInMonth };

  const days: Array<{
    date: JalaliDate;
    isToday: boolean;
    isWeekend: boolean;
    isCurrentMonth: boolean;
  }> = [];

  // محاسبه روزهای ماه
  for (let i = 1; i <= daysInMonth; i++) {
    const date: JalaliDate = { year: jy, month: jm, day: i };
    const today = new Date();
    const todayJalali = toJalali(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    days.push({
      date,
      isToday:
        date.year === todayJalali.year &&
        date.month === todayJalali.month &&
        date.day === todayJalali.day,
      isWeekend: getDayOfWeek(date.year, date.month, date.day) === 5, // جمعه
      isCurrentMonth: true,
    });
  }

  return {
    daysInMonth,
    firstDay,
    lastDay,
    weeks: Math.ceil(daysInMonth / 7),
    days,
  };
}

/**
 * دریافت تعداد روزهای ماه
 * @param year سال شمسی
 * @param month ماه شمسی
 * @returns تعداد روزهای ماه
 */
export function getDaysInMonth(year: number, month: number): number {
  if (month < 1 || month > 12) {
    throw new Error("ماه باید بین 1 و 12 باشد");
  }
  return month === 12 && isJalaliLeap(year) ? 30 : DAYS_IN_MONTH[month - 1];
}

/**
 * محاسبه تعداد روزهای باقیمانده تا پایان ماه
 * @param jy سال شمسی
 * @param jm ماه شمسی
 * @param jd روز شمسی
 * @returns تعداد روزهای باقیمانده
 */
export function getDaysUntilEndOfMonth(
  jy: number,
  jm: number,
  jd: number
): number {
  const daysInMonth = getDaysInMonth(jy, jm);
  return daysInMonth - jd;
}

/**
 * تبدیل تاریخ میلادی به شمسی
 */
function toJalali(gy: number, gm: number, gd: number): JalaliDate {
  const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let jy = gy - 621;
  const r = jalCal(jy);
  let gy2 = gy;
  let days = g2d(gy, gm, gd) - g2d(gy2, 3, r.march);
  let jm = 1;
  let jd = 1;
  let k = 0;

  while (k < 12 && days > 0) {
    const lastDay = isJalaliLeap(jy) && jm === 7 ? 30 : gDaysInMonth[jm - 1];
    if (days <= lastDay) {
      jd = days;
      break;
    }
    days -= lastDay;
    k++;
    jm++;
  }

  return { year: jy, month: jm, day: jd };
}

/**
 * محاسبه تاریخ شروع سال شمسی و روز اول فروردین در تقویم میلادی
 */
function jalCal(jy: number): { gy: number; march: number } {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
    2192, 2262, 2324, 2394, 2456, 3178,
  ];
  const bl = breaks.length;
  const gy = jy + 621;
  let leapJ = -14;
  let jp = breaks[0];
  let jm = 0;
  let jump = 0;
  let n = 0;
  let i;

  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;

  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) {
    leapJ += 1;
  }

  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;

  return { gy, march };
}

/**
 * تبدیل تاریخ میلادی به روز از ابتدای سال
 */
function g2d(gy: number, gm: number, gd: number): number {
  let d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(8 - gm, 6), 100) * 3, 4) + 752;
  return d;
}

/**
 * تقسیم صحیح
 */
function div(a: number, b: number): number {
  return ~~(a / b);
}

/**
 * باقیمانده تقسیم
 */
function mod(a: number, b: number): number {
  return a - ~~(a / b) * b;
}
