import { toJalali, toGregorian } from "../utils/DateConverter";
import { formatDate, getFormattedDate } from "../utils/DateFormatter";
import { getWeekInfo, getWorkingDays } from "../utils/WeekUtils";
import {
  getMonthInfo,
  getDaysInMonth,
  getDaysUntilEndOfMonth,
} from "../utils/MonthUtils";
import { getSeason, getDaysUntilEndOfSeason } from "../utils/SeasonUtils";
import { dateToWords } from "../utils/NumberConverter";
import { JalaliDate, WeekInfo, MonthInfo, FormattedDate } from "../types";

export class Jalali {
  private date: JalaliDate;

  constructor(year?: number, month?: number, day?: number) {
    if (year && month && day) {
      this.date = { year, month, day };
    } else {
      const now = new Date();
      const gregorian = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      };
      this.date = toJalali(gregorian.year, gregorian.month, gregorian.day);
    }
  }

  /**
   * تبدیل تاریخ میلادی به شمسی
   */
  static fromGregorian(year: number, month: number, day: number): Jalali {
    const jalali = toJalali(year, month, day);
    return new Jalali(jalali.year, jalali.month, jalali.day);
  }

  /**
   * تبدیل تاریخ شمسی به میلادی
   */
  toGregorian(): { year: number; month: number; day: number } {
    return toGregorian(this.date.year, this.date.month, this.date.day);
  }

  /**
   * فرمت کردن تاریخ شمسی
   */
  format(format: string): string {
    return formatDate(this.date.year, this.date.month, this.date.day, format);
  }

  /**
   * دریافت تاریخ فرمت شده به صورت‌های مختلف
   */
  getFormattedDate(): FormattedDate {
    return getFormattedDate(this.date.year, this.date.month, this.date.day);
  }

  /**
   * دریافت اطلاعات هفته
   */
  getWeekInfo(): WeekInfo {
    return getWeekInfo(this.date.year, this.date.month, this.date.day);
  }

  /**
   * محاسبه تعداد روزهای کاری بین دو تاریخ
   */
  getWorkingDays(endDate: Jalali): number {
    return getWorkingDays(this.date, endDate.date);
  }

  /**
   * دریافت اطلاعات ماه
   */
  getMonthInfo(): MonthInfo {
    return getMonthInfo(this.date.year, this.date.month);
  }

  /**
   * دریافت تعداد روزهای ماه
   */
  getDaysInMonth(): number {
    return getDaysInMonth(this.date.year, this.date.month);
  }

  /**
   * محاسبه تعداد روزهای باقی‌مانده تا پایان ماه
   */
  getDaysUntilEndOfMonth(): number {
    return getDaysUntilEndOfMonth(
      this.date.year,
      this.date.month,
      this.date.day
    );
  }

  /**
   * دریافت فصل
   */
  getSeason(): string {
    return getSeason(this.date.month);
  }

  /**
   * محاسبه تعداد روزهای باقی‌مانده تا پایان فصل
   */
  getDaysUntilEndOfSeason(): number {
    return getDaysUntilEndOfSeason(
      this.date.year,
      this.date.month,
      this.date.day
    );
  }

  /**
   * تبدیل تاریخ به کلمات فارسی
   */
  toWords(): string {
    return dateToWords(this.date.year, this.date.month, this.date.day);
  }

  /**
   * دریافت سال
   */
  getYear(): number {
    return this.date.year;
  }

  /**
   * دریافت ماه
   */
  getMonth(): number {
    return this.date.month;
  }

  /**
   * دریافت روز
   */
  getDay(): number {
    return this.date.day;
  }

  /**
   * تنظیم سال
   */
  setYear(year: number): Jalali {
    this.date.year = year;
    return this;
  }

  /**
   * تنظیم ماه
   */
  setMonth(month: number): Jalali {
    if (month < 1 || month > 12) {
      throw new Error("ماه باید بین 1 و 12 باشد");
    }
    this.date.month = month;
    return this;
  }

  /**
   * تنظیم روز
   */
  setDay(day: number): Jalali {
    const daysInMonth = getDaysInMonth(this.date.year, this.date.month);
    if (day < 1 || day > daysInMonth) {
      throw new Error(`روز باید بین 1 و ${daysInMonth} باشد`);
    }
    this.date.day = day;
    return this;
  }

  /**
   * تبدیل به تاریخ میلادی
   */
  toDate(): Date {
    const gregorian = this.toGregorian();
    return new Date(gregorian.year, gregorian.month - 1, gregorian.day);
  }

  /**
   * تبدیل به رشته
   */
  toString(): string {
    return this.format("YYYY/MM/DD");
  }

  public getDate(): JalaliDate {
    return { ...this.date };
  }

  public setDate(year: number, month: number, day: number): void {
    this.date = { year, month, day };
  }
}
