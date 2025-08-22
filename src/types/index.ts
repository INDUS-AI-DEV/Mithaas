export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'analytics' | 'chart';
  analyticsData?: AnalyticsData;
  chartData?: ChartData;
}

export interface AnalyticsData {
  metric: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie';
  data: any[];
  title: string;
  xAxis?: string;
  yAxis?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  darkMode: boolean;
  notifications: boolean;
  dataRefreshInterval: '5min' | '15min' | '30min' | '1hour';
}

export interface StateData {
  name: string;
  recoveryRate: number;
  recoveredAmount: number;
  totalLoans: number;
  trend: 'up' | 'down' | 'stable';
}

export interface MonthlyTrend {
  month: string;
  recoveryRate: number;
  recoveredAmount: number;
}
