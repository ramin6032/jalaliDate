import { getWeekInfo, getWorkingDays } from "../utils/WeekUtils";

describe("WeekUtils", () => {
  describe("getWeekInfo", () => {
    it("should return week information", () => {
      const weekInfo = getWeekInfo({ year: 1402, month: 12, day: 29 });
      expect(weekInfo).toHaveProperty("weekNumber");
      expect(weekInfo).toHaveProperty("startDate");
      expect(weekInfo).toHaveProperty("endDate");
      expect(weekInfo).toHaveProperty("days");
      expect(weekInfo.days).toHaveLength(7);
    });
  });

  describe("getWorkingDays", () => {
    it("should calculate working days between two dates", () => {
      const workingDays = getWorkingDays(1402, 12, 29, 1402, 12, 30);
      expect(workingDays).toBe(1);
    });

    it("should exclude weekends from working days", () => {
      const workingDays = getWorkingDays(1402, 12, 29, 1402, 12, 31);
      expect(workingDays).toBe(1); // Friday is excluded
    });
  });
});
