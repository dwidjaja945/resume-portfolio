import firebase from 'firebase';
import { getToday } from '@/toolkit/utils/getToday';

const db = firebase.firestore();

export const getCurrentMonthTotal = async (uid: string): Promise<string> => {
  const { year, month } = getToday();
  const monthRef = db.collection(`users/${uid}/expenses/${year}/months`).doc(month);
  const monthDataRef = await monthRef.get();
  const monthData = monthDataRef.data();
  if (monthData == null) {
    return '0';
  };
  return monthData.Total;
};

export const getCurrentDayTotal = async (uid: string): Promise<string> => {
  const { year, month, day } = getToday();
  const dayRef = db.collection(`users/${uid}/expenses/${year}/months/${month}/days`).doc(day);
  const dayDataRef = await dayRef.get();
  const dayData = dayDataRef.data();
  if (dayData == null) {
    return '0';
  };
  return dayData.Total;
};
