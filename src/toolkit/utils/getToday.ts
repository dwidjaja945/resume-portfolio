// YYYY-MM-DD
export const getToday = (): Today => {
  const today = new Date();
  const year = String(today.getFullYear());
  let monthValue: string | number = today.getMonth() + 1; // Months are 0-indexed
  if (monthValue < 10) {
    monthValue = `0${monthValue}`;
  }
  const month = String(monthValue);
  let dayValue: string | number = today.getDate();
  if (dayValue < 10) {
    dayValue = `0${dayValue}`;
  }
  const day = String(dayValue);

  return {
    year,
    month,
    day,
    today: `${year}-${month}-${day}`,
  };
};
