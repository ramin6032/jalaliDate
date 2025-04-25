import { getSeason, getDaysUntilEndOfSeason } from "../utils/SeasonUtils";

describe("SeasonUtils", () => {
  describe("getSeason", () => {
    it("should return season number for spring", () => {
      expect(getSeason(1)).toBe(1); // Farvardin
      expect(getSeason(2)).toBe(1); // Ordibehesht
      expect(getSeason(3)).toBe(1); // Khordad
    });

    it("should return season number for summer", () => {
      expect(getSeason(4)).toBe(2); // Tir
      expect(getSeason(5)).toBe(2); // Mordad
      expect(getSeason(6)).toBe(2); // Shahrivar
    });

    it("should return season number for autumn", () => {
      expect(getSeason(7)).toBe(3); // Mehr
      expect(getSeason(8)).toBe(3); // Aban
      expect(getSeason(9)).toBe(3); // Azar
    });

    it("should return season number for winter", () => {
      expect(getSeason(10)).toBe(4); // Dey
      expect(getSeason(11)).toBe(4); // Bahman
      expect(getSeason(12)).toBe(4); // Esfand
    });

    it("should throw error for invalid month", () => {
      expect(() => getSeason(13)).toThrow("Invalid month");
    });
  });

  describe("getDaysUntilEndOfSeason", () => {
    it("should calculate days until end of season", () => {
      const daysUntilEnd = getDaysUntilEndOfSeason({
        year: 1402,
        month: 12,
        day: 29,
      });
      expect(daysUntilEnd).toBe(1);
    });
  });
});
