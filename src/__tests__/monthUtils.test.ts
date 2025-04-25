import {
  getMonthInfo,
  getDaysInMonth,
  getDaysUntilEndOfMonth,
} from "../utils/MonthUtils";

describe("MonthUtils", () => {
  describe("getMonthInfo", () => {
    it("should return month information", () => {
      const monthInfo = getMonthInfo({ year: 1402, month: 12, day: 29 });
      expect(monthInfo).toHaveProperty("daysInMonth");
      expect(monthInfo).toHaveProperty("firstDay");
      expect(monthInfo).toHaveProperty("lastDay");
      expect(monthInfo).toHaveProperty("weeks");
      expect(monthInfo).toHaveProperty("days");
    });
  });

  describe("getDaysInMonth", () => {
    it("should return number of days in month", () => {
      const daysInMonth = getDaysInMonth(1402, 12);
      expect(daysInMonth).toBe(29);
    });

    it("should throw error for invalid month", () => {
      expect(() => getDaysInMonth(1402, 13)).toThrow("Invalid month");
    });
  });

  describe("getDaysUntilEndOfMonth", () => {
    it("should calculate days until end of month", () => {
      const daysUntilEnd = getDaysUntilEndOfMonth(1402, 12, 29);
      expect(daysUntilEnd).toBe(0);
    });
  });
});
