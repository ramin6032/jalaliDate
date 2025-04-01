# JalaliDate.js

A lightweight, dependency-free JavaScript library for working with Jalali (Persian/Shamsi) calendar.

## Installation

```bash
npm install jalali-date-js
```

## Usage

### Import the library

```javascript
// CommonJS
const JalaliDate = require("jalali-date-js");

// ES Modules
import JalaliDate from "jalali-date-js";
```

### Create a Jalali date

```javascript
// From the current date
const today = JalaliDate.now();
console.log(today.format()); // e.g., "1402/10/15"

// From a specific Gregorian date
const birthday = new JalaliDate(new Date(1990, 5, 15)); // June 15, 1990
console.log(birthday.format()); // e.g., "1369/03/25"

// From Jalali year, month, and day
const specific = new JalaliDate(1401, 7, 16);
console.log(specific.format()); // "1401/07/16"
```

### Format dates

```javascript
const date = JalaliDate.now();

// Default format (YYYY/MM/DD)
console.log(date.format()); // e.g., "1402/10/15"

// Custom format
console.log(date.format("YYYY-MM-DD")); // e.g., "1402-10-15"
console.log(date.format("YY/M/D")); // e.g., "02/10/15"
```

### Get Persian month and day names

```javascript
const date = JalaliDate.now();

// Get Persian month name
console.log(date.getMonthName()); // e.g., "دی"

// Get Persian day name
console.log(date.getDayName()); // e.g., "دوشنبه"
```

### Convert between Jalali and Gregorian

```javascript
// Convert Gregorian date to Jalali
const jalaliDate = JalaliDate.toJalali(new Date(2023, 0, 1));
console.log(jalaliDate); // { year: 1401, month: 10, day: 11 }

// Convert Jalali date to Gregorian Date object
const jalali = new JalaliDate(1401, 10, 11);
const gregorian = jalali.toDate();
console.log(gregorian); // 2023-01-01T00:00:00.000Z
```

## API Reference

### Constructor

- `new JalaliDate(year, month, day)` - Create a new Jalali date with the given year, month (1-12), and day
- `new JalaliDate(date)` - Create a new Jalali date from a JavaScript Date object

### Static Methods

- `JalaliDate.toJalali(date)` - Convert a JavaScript Date to a Jalali date object
- `JalaliDate.now()` - Get the current date as a JalaliDate

### Instance Methods

- `format(formatString)` - Format the date according to the format string
- `toDate()` - Convert to a JavaScript Date object
- `getMonthName()` - Get the Persian name of the month
- `getDayOfWeek()` - Get the day of week (0-6, where 0 is Saturday)
- `getDayName()` - Get the Persian name of the day of week

## License

MIT
