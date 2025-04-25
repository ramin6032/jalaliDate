import { formatDate, parseDate } from "../utils/FormatUtils";

describe("FormatUtils", () => {
  describe("formatDate", () => {
    it("should format date", () => {
      const date = { year: 1402, month: 12, day: 29 };
      const formatted = formatDate(date);
      expect(formatted).toHaveProperty("short");
      expect(formatted).toHaveProperty("medium");
      expect(formatted).toHaveProperty("long");
      expect(formatted).toHaveProperty("full");
      expect(formatted).toHaveProperty("persian");
      expect(formatted).toHaveProperty("words");
    });
  });

  describe("parseDate", () => {
    it("should throw error for not implemented", () => {
      expect(() => parseDate("1402/12/29")).toThrow("Not implemented");
    });
  });
});
