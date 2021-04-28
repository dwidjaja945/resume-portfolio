// YYYY-MM-DD
export const getToday = (): {
  year: string;
  month: string;
  day: string;
  today: string;
} => {
  const today = new Date();
  const year = String(today.getFullYear());
  let monthValue: string | number = today.getMonth() + 1; // Months are 0-indexed
  if (monthValue < 10) {
    monthValue = `0${monthValue}`;
  }
  const month = String(monthValue);
  const day = String(today.getDate());
  return {
    year,
    month,
    day,
    today: `${year}-${month}-${day}`,
  };
};
