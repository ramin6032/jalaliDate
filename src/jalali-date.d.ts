declare class JalaliDate {
  year: number;
  month: number;
  day: number;

  constructor(year: number, month: number, day: number);
  constructor(date: Date);

  static toJalali(date: Date): { year: number; month: number; day: number };
  toDate(): Date;
  format(format?: string): string;
  getMonthName(): string;
  getDayOfWeek(): number;
  getDayName(): string;
  static now(): JalaliDate;
}

export = JalaliDate;
