// const JalaliDate = require("./src/jalali-date.js");

// // Test today's date
// const today = JalaliDate.now();
// console.log("Today in Jalali format:", today.format());
// console.log("Month name:", today.getMonthName());
// console.log("Day name:", today.getDayName());

// // Test specific date that should match 1404/01/11
// const target = new Date(2025, 2, 31); // March 31, 2025
// const jalaliTarget = JalaliDate.toJalali(target);
// console.log(
//   "Target date (2025/03/31) in Jalali:",
//   `${jalaliTarget.year}/${
//     jalaliTarget.month < 10 ? "0" + jalaliTarget.month : jalaliTarget.month
//   }/${jalaliTarget.day < 10 ? "0" + jalaliTarget.day : jalaliTarget.day}`
// );

// // Convert Persian numerals
// function toPersianNumbers(str) {
//   const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
//   return str.replace(/[0-9]/g, function (d) {
//     return persianDigits[parseInt(d)];
//   });
// }

// // Format the date with Persian numerals
// console.log(
//   "Target date with Persian numerals:",
//   toPersianNumbers(
//     jalaliTarget.year +
//       "/" +
//       (jalaliTarget.month < 10
//         ? "0" + jalaliTarget.month
//         : jalaliTarget.month) +
//       "/" +
//       (jalaliTarget.day < 10 ? "0" + jalaliTarget.day : jalaliTarget.day)
//   )
// );
import Jalali from "./src/jalali.js";

// نمونه استفاده:
const todayGregorian = new Date(2025, 3, 2);

const todayJalali = new Jalali(todayGregorian);
console.log(
  todayJalali.date,
  todayJalali.addMonths(1),
  Jalali.addMonths(1404, 1, 13, 1)
);
