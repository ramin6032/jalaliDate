import { JalaliDate, WeekInfo, MonthInfo, FormattedDate } from "../types";

describe("Types", () => {
  describe("JalaliDate", () => {
    it("should have correct properties", () => {
      const date: JalaliDate = {
        year: 1402,
        month: 12,
        day: 29,
      };
      expect(date).toHaveProperty("year");
      expect(date).toHaveProperty("month");
      expect(date).toHaveProperty("day");
    });
  });

  describe("WeekInfo", () => {
    it("should have correct properties", () => {
      const weekInfo: WeekInfo = {
        weekNumber: 1,
        startDate: { year: 1402, month: 12, day: 29 },
        endDate: { year: 1402, month: 12, day: 30 },
        days: [
          {
            date: { year: 1402, month: 12, day: 29 },
            isToday: true,
            isWeekend: false,
          },
        ],
      };
      expect(weekInfo).toHaveProperty("weekNumber");
      expect(weekInfo).toHaveProperty("startDate");
      expect(weekInfo).toHaveProperty("endDate");
      expect(weekInfo).toHaveProperty("days");
    });
  });

  describe("MonthInfo", () => {
    it("should have correct properties", () => {
      const monthInfo: MonthInfo = {
        daysInMonth: 29,
        firstDay: { year: 1402, month: 12, day: 1 },
        lastDay: { year: 1402, month: 12, day: 29 },
        weeks: 5,
        days: [
          {
            date: { year: 1402, month: 12, day: 1 },
            isToday: false,
            isWeekend: false,
            isCurrentMonth: true,
          },
        ],
      };
      expect(monthInfo).toHaveProperty("daysInMonth");
      expect(monthInfo).toHaveProperty("firstDay");
      expect(monthInfo).toHaveProperty("lastDay");
      expect(monthInfo).toHaveProperty("weeks");
      expect(monthInfo).toHaveProperty("days");
    });
  });

  describe("FormattedDate", () => {
    it("should have correct properties", () => {
      const formattedDate: FormattedDate = {
        short: "1402/12/29",
        medium: "29 اسفند 1402",
        long: "سه‌شنبه، 29 اسفند 1402",
        full: "سه‌شنبه، 29 اسفند 1402 هجری شمسی",
        persian: "1402年12月29日",
        words: "29 روز از ماه اسفند سال 1402",
      };
      expect(formattedDate).toHaveProperty("short");
      expect(formattedDate).toHaveProperty("medium");
      expect(formattedDate).toHaveProperty("long");
      expect(formattedDate).toHaveProperty("full");
      expect(formattedDate).toHaveProperty("persian");
      expect(formattedDate).toHaveProperty("words");
    });
  });
});
