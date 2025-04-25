/**
 * تبدیل اعداد انگلیسی به فارسی
 * @param str رشته حاوی اعداد انگلیسی
 * @returns رشته با اعداد فارسی
 */
export function toPersianNumbers(str: string): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (d) => persianNumbers[parseInt(d)]);
}

/**
 * تبدیل اعداد فارسی به انگلیسی
 * @param str رشته حاوی اعداد فارسی
 * @returns رشته با اعداد انگلیسی
 */
export function toEnglishNumbers(str: string): string {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
}
