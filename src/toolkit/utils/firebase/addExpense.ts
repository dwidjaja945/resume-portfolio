import firebase from 'firebase';

const db = firebase.firestore();

const getDollarString = (dollarNumber: number): string =>
  dollarNumber.toFixed(2);

const updateYearlyExpenses = async (
  uid: string,
  newMonthData: {
    [category: string]: string;
  },
  today: Partial<Today>
): Promise<void> => {
  const { year } = today;
  const yearRef = db.collection(`users/${uid}/expenses`).doc(year);
  const yearDataRef = await yearRef.get();
  const yearData = yearDataRef.data();
  if (yearData == null) {
    yearRef.set({ ...newMonthData });
    return;
  }
  const newYearData = { ...newMonthData };
  Object.keys(newMonthData).forEach(category => {
    if (newYearData[category] === undefined) {
      newYearData[category] = newMonthData[category];
    } else {
      newYearData[category] = getDollarString(
        Number(yearData[category] ?? 0) + Number(newMonthData[category])
      );
    }
  });
  yearRef.set({ ...newYearData });
};

const updateMonthlyExpenses = async (
  uid: string,
  newDayData: {
    [category: string]: string;
  },
  today: Partial<Today>
): Promise<void> => {
  const { month, year } = today;
  const monthRef = db.collection(`users/${uid}/expenses/${year}/months`).doc(month);
  const monthDataRef = await monthRef.get();
  const monthData = monthDataRef.data();
  if (monthData == null) {
    monthRef.set({ ...newDayData });
    return;
  };
  const newMonthData = { ...monthData };
  Object.keys(newDayData).forEach(category => {
    if (newMonthData[category] === undefined) {
      newMonthData[category] = newDayData[category];
    } else {
      newMonthData[category] = getDollarString(
        Number(monthData[category] ?? 0) + Number(newDayData[category])
      );
    }
  });
  monthRef.set({ ...newMonthData });
  updateYearlyExpenses(uid, newMonthData, today);
};

const updateDailyExpenses = async (
  uid: string,
  today: Partial<Today>
): Promise<void> => {
  const { day, month, year } = today;
  const dayRef = db.collection(`users/${uid}/expenses/${year}/months/${month}/days`);
  const todayRef = dayRef.doc(day).collection('expenses');
  const { docs } = await todayRef.get();
  const todayExpenses = docs.map(doc => doc.data());
  const expenseTable: {
    [category: string]: string;
  } = {};
  const todayNewTotal = todayExpenses.reduce(
    (accum: string, curr: firebase.firestore.DocumentData): string => {
      const { amount, category } = curr;
      const currentCategory = expenseTable[category];
      if (currentCategory === undefined) {
        expenseTable[category] = String(amount);
      } else {
        expenseTable[category] = getDollarString(Number(currentCategory) + Number(amount));
      }
      return getDollarString(Number(accum) + Number(amount));
    },
    '0'
  );
  const newDayData = { Total: todayNewTotal, ...expenseTable };
  dayRef.doc(day).set(newDayData);
  updateMonthlyExpenses(uid, newDayData, today);
};

export const addExpense = async (
  uid: string,
  data: MailerPRIVATE_ExpenseBody
): Promise<void> => {
  const expenseRef = db.collection(`users/${uid}/expenses`);
  const { date: spendDate } = data;
  const date = new Date(spendDate);
  const day = String(date.getDate() + 1); // days are 0-indexed
  // 2021-10-31 => 30 October, 2021
  // 2021-11-01 => 31 October, 2021
  const monthNum = date.getMonth() + 1;
  const monthString = monthNum < 10 ? `0${monthNum}` : String(monthNum);
  const month = String(monthString); // months are 0-indexed
  const year = String(date.getFullYear());
  const today = { day, month, year };
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
  updateDailyExpenses(uid, today);
};
