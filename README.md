# Modern Persian Jalali Date Picker

یک کتابخانه مدرن برای کار با تاریخ شمسی (جلالی) با قابلیت تبدیل تاریخ، فرمت‌بندی، محاسبات تقویمی و پشتیبانی از TypeScript.

## نصب

### npm

```bash
npm install modern-persian-jalali-date-picker
```

### yarn

```bash
yarn add modern-persian-jalali-date-picker
```

### CDN

```html
<script src="https://unpkg.com/modern-persian-jalali-date-picker/dist/jalali.min.js"></script>
```

## استفاده

### JavaScript

```javascript
const jalali = new Jalali(1402, 12, 29);
console.log(jalali.format("YYYY/MM/DD")); // 1402/12/29
console.log(jalali.toWords()); // بیست و نهم اسفند هزار و چهارصد و دو
```

### Node.js

```javascript
const Jalali = require("modern-persian-jalali-date-picker");
const jalali = new Jalali(1402, 12, 29);
console.log(jalali.format("YYYY/MM/DD")); // 1402/12/29
```

### ES Modules

```javascript
import Jalali from "modern-persian-jalali-date-picker";
const jalali = new Jalali(1402, 12, 29);
console.log(jalali.format("YYYY/MM/DD")); // 1402/12/29
```

### React

```jsx
import Jalali from "modern-persian-jalali-date-picker";

function App() {
  const jalali = new Jalali(1402, 12, 29);
  return (
    <div>
      <p>{jalali.format("YYYY/MM/DD")}</p>
      <p>{jalali.toWords()}</p>
    </div>
  );
}
```

### TypeScript

```typescript
import Jalali from "modern-persian-jalali-date-picker";

const jalali = new Jalali(1402, 12, 29);
console.log(jalali.format("YYYY/MM/DD")); // 1402/12/29
console.log(jalali.toWords()); // بیست و نهم اسفند هزار و چهارصد و دو

// استفاده از interface‌ها
const date: JalaliDate = { year: 1402, month: 12, day: 29 };
const weekInfo: WeekInfo = jalali.getWeekInfo();
const monthInfo: MonthInfo = jalali.getMonthInfo();
```

## API

### تبدیل تاریخ

- `fromGregorian(year: number, month: number, day: number): Jalali`
- `toGregorian(): { year: number; month: number; day: number }`
- `toDate(): Date`

### فرمت‌بندی

- `format(format: string): string`
- `getFormattedDate(): FormattedDate`
- `toWords(): string`
- `toString(): string`

### اطلاعات هفته

- `getWeekInfo(): WeekInfo`
- `getWorkingDays(endDate: Jalali): number`

### اطلاعات ماه

- `getMonthInfo(): MonthInfo`
- `getDaysInMonth(): number`
- `getDaysUntilEndOfMonth(): number`

### اطلاعات فصل

- `getSeason(): string`
- `getDaysUntilEndOfSeason(): number`

### دریافت و تنظیم

- `getYear(): number`
- `getMonth(): number`
- `getDay(): number`
- `setYear(year: number): Jalali`
- `setMonth(month: number): Jalali`
- `setDay(day: number): Jalali`

## TypeScript

این کتابخانه با TypeScript نوشته شده و شامل تعریف‌های نوع (type definitions) است. interface‌های اصلی:

```typescript
interface JalaliDate {
  year: number;
  month: number;
  day: number;
}

interface WeekInfo {
  weekNumber: number;
  startDate: JalaliDate;
  endDate: JalaliDate;
  days: Array<{
    date: JalaliDate;
    dayOfWeek: number;
    dayName: string;
    isToday: boolean;
    isWeekend: boolean;
  }>;
}

interface MonthInfo {
  monthNumber: number;
  monthName: string;
  daysInMonth: number;
  firstDay: JalaliDate;
  lastDay: JalaliDate;
  weeks: WeekInfo[];
  season: string;
}

interface FormattedDate {
  short: string;
  medium: string;
  long: string;
  full: string;
  persian: string;
  words: string;
}
```

## مجوز

MIT
