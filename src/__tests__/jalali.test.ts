import { Jalali } from "../jalali";

describe("Jalali", () => {
  describe("constructor", () => {
    it("should create a new Jalali instance", () => {
      const date = new Jalali(1402, 12, 29);
      expect(date).toBeInstanceOf(Jalali);
      expect(date).toHaveProperty("year", 1402);
      expect(date).toHaveProperty("month", 12);
      expect(date).toHaveProperty("day", 29);
    });
  });

  describe("fromGregorian", () => {
    it("should convert Gregorian date to Jalali", () => {
      const date = Jalali.fromGregorian(2024, 3, 19);
      expect(date).toBeInstanceOf(Jalali);
      expect(date).toHaveProperty("year", 1402);
      expect(date).toHaveProperty("month", 12);
      expect(date).toHaveProperty("day", 29);
    });
  });

  describe("toGregorian", () => {
    it("should convert Jalali date to Gregorian", () => {
      const date = new Jalali(1402, 12, 29);
      const gregorian = date.toGregorian();
      expect(gregorian).toHaveProperty("year", 2024);
      expect(gregorian).toHaveProperty("month", 3);
      expect(gregorian).toHaveProperty("day", 19);
    });
  });

  describe("getWeekInfo", () => {
    it("should return week information", () => {
      const date = new Jalali(1402, 12, 29);
      const weekInfo = date.getWeekInfo();
      expect(weekInfo).toHaveProperty("weekNumber");
      expect(weekInfo).toHaveProperty("startDate");
      expect(weekInfo).toHaveProperty("endDate");
      expect(weekInfo).toHaveProperty("days");
      expect(weekInfo.days).toHaveLength(7);
    });
  });

  describe("getWorkingDays", () => {
    it("should calculate working days between two dates", () => {
      const date1 = new Jalali(1402, 12, 29);
      const date2 = new Jalali(1402, 12, 30);
      const workingDays = date1.getWorkingDays(date2);
      expect(workingDays).toBe(1);
    });
  });

  describe("getMonthInfo", () => {
    it("should return month information", () => {
      const date = new Jalali(1402, 12, 29);
      const monthInfo = date.getMonthInfo();
      expect(monthInfo).toHaveProperty("daysInMonth");
      expect(monthInfo).toHaveProperty("firstDay");
      expect(monthInfo).toHaveProperty("lastDay");
      expect(monthInfo).toHaveProperty("weeks");
      expect(monthInfo).toHaveProperty("days");
    });
  });

  describe("getDaysInMonth", () => {
    it("should return number of days in month", () => {
      const date = new Jalali(1402, 12, 29);
      const daysInMonth = date.getDaysInMonth();
      expect(daysInMonth).toBe(29);
    });
  });

  describe("getDaysUntilEndOfMonth", () => {
    it("should calculate days until end of month", () => {
      const date = new Jalali(1402, 12, 29);
      const daysUntilEnd = date.getDaysUntilEndOfMonth();
      expect(daysUntilEnd).toBe(0);
    });
  });

  describe("getSeason", () => {
    it("should return season number", () => {
      const date = new Jalali(1402, 12, 29);
      const season = date.getSeason();
      expect(season).toBe(4); // Winter
    });
  });

  describe("getDaysUntilEndOfSeason", () => {
    it("should calculate days until end of season", () => {
      const date = new Jalali(1402, 12, 29);
      const daysUntilEnd = date.getDaysUntilEndOfSeason();
      expect(daysUntilEnd).toBe(1);
    });
  });

  describe("format", () => {
    it("should format date", () => {
      const date = new Jalali(1402, 12, 29);
      const formatted = date.format();
      expect(formatted).toHaveProperty("short");
      expect(formatted).toHaveProperty("medium");
      expect(formatted).toHaveProperty("long");
      expect(formatted).toHaveProperty("full");
      expect(formatted).toHaveProperty("persian");
      expect(formatted).toHaveProperty("words");
    });
  });

  describe("parse", () => {
    it("should parse date string", () => {
      const date = Jalali.parse("1402/12/29");
      expect(date).toBeInstanceOf(Jalali);
      expect(date).toHaveProperty("year", 1402);
      expect(date).toHaveProperty("month", 12);
      expect(date).toHaveProperty("day", 29);
    });
  });
});
