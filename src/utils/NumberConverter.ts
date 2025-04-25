import { MONTH_NAMES } from "../constants";

/**
 * تبدیل عدد به حروف فارسی
 * @param num عدد مورد نظر
 * @returns عدد به صورت حروف فارسی
 */
export function numberToWords(num: number): string {
  const units = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
  const teens = [
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزده",
  ];
  const tens = [
    "",
    "",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];
  const hundreds = [
    "",
    "یکصد",
    "دویست",
    "سیصد",
    "چهارصد",
    "پانصد",
    "ششصد",
    "هفتصد",
    "هشتصد",
    "نهصد",
  ];
  const scales = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

  if (num === 0) return "صفر";
  if (num < 0) return "منفی " + numberToWords(Math.abs(num));

  let words = "";
  let scaleIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      let chunkWords = "";
      const h = Math.floor(chunk / 100);
      const t = Math.floor((chunk % 100) / 10);
      const u = chunk % 10;

      if (h > 0) chunkWords += hundreds[h] + " و ";
      if (t === 1) {
        chunkWords += teens[u];
      } else {
        if (t > 0) chunkWords += tens[t];
        if (u > 0) {
          if (t > 0) chunkWords += " و ";
          chunkWords += units[u];
        }
      }

      if (scaleIndex > 0) chunkWords += " " + scales[scaleIndex];
      words = chunkWords + (words ? " و " + words : "");
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return words;
}

/**
 * تبدیل تاریخ به حروف فارسی
 * @param jy سال شمسی
 * @param jm ماه شمسی
 * @param jd روز شمسی
 * @returns تاریخ به صورت حروف فارسی
 */
export function dateToWords(jy: number, jm: number, jd: number): string {
  const MONTH_NAMES = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  return `${numberToWords(jd)} ${MONTH_NAMES[jm - 1]} ${numberToWords(jy)}`;
}
