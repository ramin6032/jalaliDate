// Option 1: Import from local file (during development)
// Note: You would need to use a bundler like webpack or rollup for this to work in browser
import JalaliDate from "./src/jalali-date.js";

// Option 2: When used as an installed package
// import JalaliDate from 'jalali-date-js';

// Create a Jalali date from the current Gregorian date
const today = JalaliDate.now();
console.log(`Today is: ${today.format()}`);
console.log(`Month name: ${today.getMonthName()}`);
console.log(`Day name: ${today.getDayName()}`);

// Convert a specific Gregorian date to Jalali
const birthdate = new JalaliDate(new Date(1990, 5, 15)); // June 15, 1990
console.log(`Birthdate in Jalali: ${birthdate.format("YYYY/MM/DD")}`);

// Create a Jalali date directly
const specificDate = new JalaliDate(1402, 1, 14);
console.log(`Specific date: ${specificDate.format()}`);

// Convert to Gregorian
const gregorianDate = specificDate.toDate();
console.log(
  `Converted back to Gregorian: ${gregorianDate.toISOString().split("T")[0]}`
);

// Using the static conversion method
const jalaliObj = JalaliDate.toJalali(new Date(2023, 0, 1)); // January 1, 2023
console.log(
  `2023-01-01 in Jalali: ${jalaliObj.year}/${jalaliObj.month}/${jalaliObj.day}`
);
