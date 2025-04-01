// Create a Jalali date from the current Gregorian date
const today = JalaliDate.now();
console.log(`Today is: ${today.format()}`);

// Convert a specific Gregorian date to Jalali
const birthdate = new JalaliDate(new Date(1990, 5, 15)); // June 15, 1990
console.log(`Birthdate in Jalali: ${birthdate.format("YYYY/MM/DD")}`);
console.log(`Month name: ${birthdate.getMonthName()}`);
console.log(`Day name: ${birthdate.getDayName()}`);
