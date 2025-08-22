import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
// Demo data removed; components will show empty placeholders until wired to backend

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export const Reports: React.FC = () => {
  const demoStateData: any[] = [];
  const demoMonthlyTrends: any[] = [];
  const pieData = demoStateData.map((state: any) => ({
    name: state.name,
    value: state.recoveryRate
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
        <p className="text-muted-foreground">Detailed analytics and performance reports</p>
      </div>

      {/* Loan Recovery by State */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Recovery by State</CardTitle>
          <CardDescription>Recovery rates across different states</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demoStateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="recoveryRate" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Performing Regions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Regions</CardTitle>
            <CardDescription>Recovery performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Recovery Trend</CardTitle>
            <CardDescription>6-month performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={demoMonthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="recoveryRate" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed State Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed State Analysis</CardTitle>
          <CardDescription>Comprehensive breakdown by state</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-medium">State</th>
                  <th className="text-left p-2 font-medium">Recovery Rate</th>
                  <th className="text-left p-2 font-medium">Recovered Amount</th>
                  <th className="text-left p-2 font-medium">Total Loans</th>
                  <th className="text-left p-2 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {demoStateData.map((state: any) => (
                  <tr key={state.name} className="border-b border-border">
                    <td className="p-2 font-medium">{state.name}</td>
                    <td className="p-2">{state.recoveryRate}%</td>
                    <td className="p-2">₹{state.recoveredAmount}L</td>
                    <td className="p-2">{state.totalLoans.toLocaleString()}</td>
                    <td className="p-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        state.trend === 'up' ? 'bg-green-100 text-green-800' :
                        state.trend === 'down' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {state.trend === 'up' ? '↗ Up' : state.trend === 'down' ? '↘ Down' : '→ Stable'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
