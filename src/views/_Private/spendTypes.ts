export const spendTypes = [
  {
    id: 0,
    spendType: 'Rent'
  },
  {
    id: 1,
    spendType: 'Utilities'
  },
  {
    id: 2,
    spendType: 'Gas'
  },
  {
    id: 3,
    spendType: 'Groceries/Necessities'
  },
  {
    id: 4,
    spendType: 'Medical'
  },
  {
    id: 5,
    spendType: 'Dental'
  },
  {
    id: 6,
    spendType: 'Optical'
  },
  {
    id: 7,
    spendType: 'Exercise'
  },
  {
    id: 8,
    spendType: 'Car'
  },
  {
    id: 9,
    spendType: 'Vehicle'
  },
  {
    id: 10,
    spendType: 'Maintenance'
  },
  {
    id: 11,
    spendType: 'Business'
  },
  {
    id: 12,
    spendType: 'Eating Out'
  },
  {
    id: 13,
    spendType: 'Entertainment/Hobbies'
  },
  {
    id: 14,
    spendType: 'Bars'
  },
  {
    id: 15,
    spendType: 'Clothes'
  },
  {
    id: 16,
    spendType: 'Kitchen'
  },
  {
    id: 17,
    spendType: 'Grooming'
  },
  {
    id: 18,
    spendType: 'Furnishing'
  },
  {
    id: 19,
    spendType: 'Gifts'
  },
  {
    id: 20,
    spendType: 'Travel'
  },
  {
    id: 21,
    spendType: 'Misc/Cash'
  }
];

export const defaultCommonSpendTypeIDs = [
  12, // Eating Out
  3, // Groceries/Necessities
  2, // Gas
  20, // Travel
  14, // Bars
];

export const defaultCommonSpendTypes = (() => {
  const table = spendTypes.reduce<{[id: string]: string}>((accum, curr) => ({
    ...accum,
    [curr.id]: curr.spendType
  }), {});
  return defaultCommonSpendTypeIDs.map(id => table[id]);
})();
