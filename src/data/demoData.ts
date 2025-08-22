import { StateData, MonthlyTrend } from '../types';

export const demoStateData: StateData[] = [
  {
    name: 'Maharashtra',
    recoveryRate: 25.8,
    recoveredAmount: 3.2,
    totalLoans: 1250,
    trend: 'up'
  },
  {
    name: 'Uttar Pradesh',
    recoveryRate: 41.0,
    recoveredAmount: 12.5,
    totalLoans: 2100,
    trend: 'up'
  },
  {
    name: 'Karnataka',
    recoveryRate: 38.5,
    recoveredAmount: 8.7,
    totalLoans: 980,
    trend: 'stable'
  },
  {
    name: 'Tamil Nadu',
    recoveryRate: 32.1,
    recoveredAmount: 6.3,
    totalLoans: 1150,
    trend: 'down'
  },
  {
    name: 'Gujarat',
    recoveryRate: 45.2,
    recoveredAmount: 9.8,
    totalLoans: 850,
    trend: 'up'
  },
  {
    name: 'Rajasthan',
    recoveryRate: 28.7,
    recoveredAmount: 4.1,
    totalLoans: 720,
    trend: 'stable'
  }
];

export const demoMonthlyTrends: MonthlyTrend[] = [
  { month: 'Jan', recoveryRate: 22.5, recoveredAmount: 8.2 },
  { month: 'Feb', recoveryRate: 24.1, recoveredAmount: 9.1 },
  { month: 'Mar', recoveryRate: 26.8, recoveredAmount: 10.3 },
  { month: 'Apr', recoveryRate: 28.3, recoveredAmount: 11.7 },
  { month: 'May', recoveryRate: 31.2, recoveredAmount: 13.2 },
  { month: 'Jun', recoveryRate: 33.7, recoveredAmount: 14.8 }
];

export const getRandomAnalyticsResponse = (query: string): string => {
  const responses = [
    "The recovery rate for Maharashtra this month is 25.8%, with a total recovered amount of ₹3.2L.",
    "Uttar Pradesh had a recovery rate of 41% last quarter, with ₹12.5L recovered.",
    "Karnataka shows a stable recovery trend at 38.5% with ₹8.7L recovered.",
    "Tamil Nadu's recovery rate is currently 32.1%, showing a slight decline from last month.",
    "Gujarat leads with the highest recovery rate of 45.2% and ₹9.8L recovered.",
    "Rajasthan maintains a recovery rate of 28.7% with ₹4.1L recovered this quarter."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const getRandomStateData = (): StateData => {
  return demoStateData[Math.floor(Math.random() * demoStateData.length)];
};
