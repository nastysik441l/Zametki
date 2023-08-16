//отвечает за кол. недели
const DAYS_IN_WEEK = 7;
//отвечает за кол.месяц
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//отвечает за кол. недели
const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

// перечесление месяцев
const Month = {};

//выделяет сегодняшнее число
export function areEqual(a, b) {
  if (!a || !b) return false;

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isLeapYear(year) {
  return !(year % 4 || (!(year % 100) && year % 400));
}
//отвечает за дни недели
export function getDaysInMonth(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = DAYS_IN_MONTH[month];

  if (isLeapYear(year) && month === Month.February) {
    return daysInMonth + 1;
  } else {
    return daysInMonth;
  }
}

export function getDayOfWeek(date) {
  const dayOfWeek = date.getDay();

  return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
}

export function getMonthData(year, month) {
  const result = [];
  const date = new Date(year, month);
  const daysInMonth = getDaysInMonth(date);
  const monthStartsOn = getDayOfWeek(date);
  let day = 1;

  for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
    result[i] = [];

    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }

  return result;
}
