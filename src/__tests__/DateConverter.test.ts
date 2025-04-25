import { toJalali, toGregorian } from "../utils/DateConverter";

describe("DateConverter", () => {
  describe("toJalali", () => {
    it("should convert Gregorian to Jalali correctly", () => {
      // تست تاریخ‌های مهم
      expect(toJalali(2025, 3, 21)).toEqual({ year: 1404, month: 1, day: 1 }); // نوروز 1404
      expect(toJalali(2024, 3, 20)).toEqual({ year: 1403, month: 1, day: 1 }); // نوروز 1403
      expect(toJalali(2025, 3, 20)).toEqual({
        year: 1403,
        month: 12,
        day: 30,
      }); // آخر سال 1403
      expect(toJalali(2024, 3, 19)).toEqual({
        year: 1402,
        month: 12,
        day: 29,
      }); // آخر سال 1402
    });

    it("should handle leap years correctly", () => {
      // تست سال‌های کبیسه
      expect(toJalali(2024, 2, 29)).toEqual({ year: 1402, month: 12, day: 10 }); // 29 فوریه 2024
      expect(toJalali(2023, 2, 28)).toEqual({ year: 1401, month: 12, day: 9 }); // 28 فوریه 2023
    });

    it("should handle edge cases", () => {
      // تست موارد خاص
      expect(toJalali(1600, 1, 1)).toEqual({ year: 978, month: 10, day: 11 });
    });
  });

  describe("toGregorian", () => {
    it("should convert Jalali to Gregorian correctly", () => {
      // تست تاریخ‌های مهم
      expect(toGregorian(1403, 1, 1)).toEqual({
        year: 2024,
        month: 3,
        day: 20,
      }); // نوروز 1403
      expect(toGregorian(1404, 1, 1)).toEqual({
        year: 2025,
        month: 3,
        day: 21,
      }); // نوروز 1404
      expect(toGregorian(1403, 12, 30)).toEqual({
        year: 2025,
        month: 3,
        day: 20,
      }); // آخر سال 1403
      expect(toGregorian(1402, 10, 10)).toEqual({
        year: 2023,
        month: 12,
        day: 31,
      }); // آخر سال 1402
    });

    it("should handle leap years correctly", () => {
      // تست سال‌های کبیسه
      expect(toGregorian(1402, 12, 10)).toEqual({
        year: 2024,
        month: 2,
        day: 29,
      }); // آخر اسفند 1402
      expect(toGregorian(1401, 12, 9)).toEqual({
        year: 2023,
        month: 2,
        day: 28,
      }); // آخر اسفند 1401
    });

    it("should handle edge cases", () => {
      // تست موارد خاص
      expect(toGregorian(978, 10, 11)).toEqual({
        year: 1600,
        month: 1,
        day: 1,
      });
      expect(toGregorian(0, 1, 1)).toEqual({ year: 621, month: 3, day: 21 });
    });

    it("should throw error for invalid dates", () => {
      // تست تاریخ‌های نامعتبر
      expect(() => toGregorian(1402, 12, 31)).toThrow(
        "Invalid day for Jalali month"
      );
      expect(() => toGregorian(1402, 13, 1)).toThrow();
    });
  });

  describe("round trip conversion", () => {
    it("should convert back and forth correctly", () => {
      // تست تبدیل رفت و برگشت
      const gregorian = { year: 2024, month: 3, day: 21 };
      const jalali = toJalali(gregorian.year, gregorian.month, gregorian.day);
      const backToGregorian = toGregorian(
        jalali.year,
        jalali.month,
        jalali.day
      );
      expect(backToGregorian).toEqual(gregorian);
    });
  });
});
