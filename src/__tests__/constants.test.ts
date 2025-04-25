import {
  DAYS_IN_MONTH,
  MONTH_NAMES,
  DAY_NAMES,
  SEASON_NAMES,
  DATE_FORMATS,
} from "../constants";

describe("Constants", () => {
  describe("DAYS_IN_MONTH", () => {
    it("should have correct number of days for each month", () => {
      expect(DAYS_IN_MONTH).toHaveLength(12);
      expect(DAYS_IN_MONTH[0]).toBe(31); // Farvardin
      expect(DAYS_IN_MONTH[1]).toBe(31); // Ordibehesht
      expect(DAYS_IN_MONTH[2]).toBe(31); // Khordad
      expect(DAYS_IN_MONTH[3]).toBe(31); // Tir
      expect(DAYS_IN_MONTH[4]).toBe(31); // Mordad
      expect(DAYS_IN_MONTH[5]).toBe(31); // Shahrivar
      expect(DAYS_IN_MONTH[6]).toBe(30); // Mehr
      expect(DAYS_IN_MONTH[7]).toBe(30); // Aban
      expect(DAYS_IN_MONTH[8]).toBe(30); // Azar
      expect(DAYS_IN_MONTH[9]).toBe(30); // Dey
      expect(DAYS_IN_MONTH[10]).toBe(30); // Bahman
      expect(DAYS_IN_MONTH[11]).toBe(29); // Esfand
    });
  });

  describe("MONTH_NAMES", () => {
    it("should have correct month names", () => {
      expect(MONTH_NAMES).toHaveLength(12);
      expect(MONTH_NAMES[0]).toBe("فروردین");
      expect(MONTH_NAMES[1]).toBe("اردیبهشت");
      expect(MONTH_NAMES[2]).toBe("خرداد");
      expect(MONTH_NAMES[3]).toBe("تیر");
      expect(MONTH_NAMES[4]).toBe("مرداد");
      expect(MONTH_NAMES[5]).toBe("شهریور");
      expect(MONTH_NAMES[6]).toBe("مهر");
      expect(MONTH_NAMES[7]).toBe("آبان");
      expect(MONTH_NAMES[8]).toBe("آذر");
      expect(MONTH_NAMES[9]).toBe("دی");
      expect(MONTH_NAMES[10]).toBe("بهمن");
      expect(MONTH_NAMES[11]).toBe("اسفند");
    });
  });

  describe("DAY_NAMES", () => {
    it("should have correct day names", () => {
      expect(DAY_NAMES).toHaveLength(7);
      expect(DAY_NAMES[0]).toBe("یکشنبه");
      expect(DAY_NAMES[1]).toBe("دوشنبه");
      expect(DAY_NAMES[2]).toBe("سه‌شنبه");
      expect(DAY_NAMES[3]).toBe("چهارشنبه");
      expect(DAY_NAMES[4]).toBe("پنج‌شنبه");
      expect(DAY_NAMES[5]).toBe("جمعه");
      expect(DAY_NAMES[6]).toBe("شنبه");
    });
  });

  describe("SEASON_NAMES", () => {
    it("should have correct season names", () => {
      expect(SEASON_NAMES).toHaveLength(4);
      expect(SEASON_NAMES[0]).toBe("بهار");
      expect(SEASON_NAMES[1]).toBe("تابستان");
      expect(SEASON_NAMES[2]).toBe("پاییز");
      expect(SEASON_NAMES[3]).toBe("زمستان");
    });
  });

  describe("DATE_FORMATS", () => {
    it("should have correct date formats", () => {
      expect(DATE_FORMATS).toHaveProperty("short");
      expect(DATE_FORMATS).toHaveProperty("medium");
      expect(DATE_FORMATS).toHaveProperty("long");
      expect(DATE_FORMATS).toHaveProperty("full");
      expect(DATE_FORMATS).toHaveProperty("persian");
      expect(DATE_FORMATS).toHaveProperty("words");
    });
  });
});
