import firebase from 'firebase';

const db = firebase.firestore();

const getDollarString = (dollarNumber: number): string =>
  dollarNumber.toFixed(2);

const updateYearlyExpenses = async (
  {
    uid,
    spendData,
    spendDate
  }: {
    uid: string;
    spendData: MailerPRIVATE_ExpenseBody;
    spendDate: Partial<Today>;
  }
): Promise<void> => {
  const { year } = spendDate;
  const yearRef = db.collection(`users/${uid}/expenses`).doc(year);
  const yearDataRef = await yearRef.get();
  const yearData = yearDataRef.data();
  const { amount, category } = spendData;
  if (yearData == null) {
    yearRef.set({ Total: amount, [category]: amount });
    return;
  }
  const newYearData = { ...yearData };
  newYearData[category] = getDollarString(
    Number(newYearData[category] ?? 0) + Number(amount)
  );
  newYearData.Total = getDollarString(
    Number(newYearData.Total ?? 0) + Number(amount)
  );
  yearRef.set(newYearData);
};

const updateMonthlyExpenses = async (
  {
    uid,
    spendDate,
    spendData
  }: {
  uid: string;
  spendData: MailerPRIVATE_ExpenseBody;
  spendDate: Partial<Today>;
  }
): Promise<void> => {
  const { month, year } = spendDate;
  const monthRef = db.collection(`users/${uid}/expenses/${year}/months`).doc(month);
  const monthDataRef = await monthRef.get();
  const monthData = monthDataRef.data();
  const { category, amount } = spendData;
  if (monthData == null) {
    const newMonthData = {
      Total: spendData.amount,
      [category]: amount
    };
    monthRef.set(newMonthData);
  } else {
    const newMonthData = { ...monthData };
    newMonthData[category] = getDollarString(
      Number(monthData[category] ?? 0) + Number(amount)
    );
    newMonthData.Total = getDollarString(
      Number(monthData.Total ?? 0) + Number(amount)
    );
    monthRef.set(newMonthData);
  }
  updateYearlyExpenses({
    uid, spendData, spendDate
  });
};

const updateDailyExpenses = async (
  {
    uid,
    spendDate,
    spendData
  }: {
  uid: string;
  spendDate: Partial<Today>;
  spendData: MailerPRIVATE_ExpenseBody;
  }
): Promise<void> => {
  const { day, month, year } = spendDate;
  const dayRef = db.collection(`users/${uid}/expenses/${year}/months/${month}/days`).doc(day);
  const spendDateRef = dayRef.collection('expenses');
  const { docs } = await spendDateRef.get();
  const spendDateExpenses = docs.map(doc => doc.data());
  const expenseTable: {
    [category: string]: string;
  } = {};
  const spendDateNewTotal = spendDateExpenses.reduce(
    (accum: string, curr: firebase.firestore.DocumentData): string => {
      const { amount, category } = curr;
      expenseTable[category] = getDollarString(
        Number(expenseTable[category] ?? 0) + Number(amount)
      );
      return getDollarString(Number(accum) + Number(amount));
    },
    '0'
  );
  const newDayData = { Total: spendDateNewTotal, ...expenseTable };
  dayRef.set(newDayData);
  updateMonthlyExpenses({
    uid, spendData, spendDate
  });
};

export const addExpense = async (
  uid: string,
  data: MailerPRIVATE_ExpenseBody
): Promise<void> => {
  const expenseRef = db.collection(`users/${uid}/expenses`);
  const { date: _spendDate } = data;
  const date = new Date(_spendDate);
  // with how I formatted the date, I need to add 1 for
  // dates like 2021-06-01
  // as it reads as 31 May, 2021 when put into new Date()
  date.setDate(date.getDate() + 1);
  const dayVal = date.getDate();
  let day = String(dayVal);
  if (dayVal < 10) {
    day = `0${day}`;
  }
  const monthNum = date.getMonth() + 1;
  const monthString = monthNum < 10 ? `0${monthNum}` : String(monthNum);
  const month = String(monthString); // months are 0-indexed
  const year = String(date.getFullYear());
  const spendDate = { day, month, year };
  const expenseData: Partial<MailerPRIVATE_ExpenseBody> = { ...data };
  delete expenseData.type;
  expenseRef
    .doc(year)
    .collection('months')
    .doc(month)
    .collection('days')
    .doc(day)
    .collection('expenses')
    .doc()
    .set({
      ...expenseData
    });
  updateDailyExpenses({
    uid, spendDate, spendData: data
  });
};
