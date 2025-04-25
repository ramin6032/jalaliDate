/**
 * متدهای تبدیل اعداد به کلمات فارسی
 */

import { MONTH_NAMES } from "../constants";

/**
 * تبدیل عدد به کلمات فارسی
 * @param {number} num - عدد مورد نظر
 * @returns {string} عدد به صورت کلمات فارسی
 */
export function numberToWords(num) {
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
    let chunk = num % 1000;
    if (chunk !== 0) {
      let chunkWords = "";

      // صدگان
      if (chunk >= 100) {
        chunkWords += hundreds[Math.floor(chunk / 100)] + " و ";
        chunk %= 100;
      }

      // دهگان و یکان
      if (chunk >= 20) {
        chunkWords += tens[Math.floor(chunk / 10)];
        if (chunk % 10 !== 0) {
          chunkWords += " و " + units[chunk % 10];
        }
      } else if (chunk >= 10) {
        chunkWords += teens[chunk - 10];
      } else if (chunk > 0) {
        chunkWords += units[chunk];
      }

      if (scaleIndex > 0) {
        chunkWords += " " + scales[scaleIndex];
      }

      words = chunkWords + (words ? " و " + words : "");
    }

    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return words.trim();
}

/**
 * تبدیل تاریخ جلالی به کلمات فارسی
 * @param {number} jy - سال جلالی
 * @param {number} jm - ماه جلالی (1-12)
 * @param {number} jd - روز جلالی
 * @returns {string} تاریخ به صورت کلمات فارسی
 */
export function dateToWords(jy, jm, jd) {
  const dayWords = numberToWords(jd);
  const monthName = MONTH_NAMES[jm - 1];
  const yearWords = numberToWords(jy);

  return `${dayWords} ${monthName} هزار و ${yearWords}`;
}
