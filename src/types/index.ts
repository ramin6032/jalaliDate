/**
 * ساختار تاریخ شمسی
 */
export interface JalaliDate {
  year: number;
  month: number;
  day: number;
}

/**
 * ساختار اطلاعات هفته
 */
export interface WeekInfo {
  weekNumber: number;
  startDate: JalaliDate;
  endDate: JalaliDate;
  days: Array<{
    date: JalaliDate;
    dayOfWeek: number;
    dayName: string;
    isToday: boolean;
    isWeekend: boolean;
  }>;
}

/**
 * ساختار اطلاعات ماه
 */
export interface MonthInfo {
  monthNumber: number;
  monthName: string;
  daysInMonth: number;
  firstDay: JalaliDate;
  lastDay: JalaliDate;
  weeks: WeekInfo[];
  season: string;
}

/**
 * ساختار تاریخ فرمت شده
 */
export interface FormattedDate {
  short: string;
  medium: string;
  long: string;
  full: string;
  persian: string;
  words: string;
}
