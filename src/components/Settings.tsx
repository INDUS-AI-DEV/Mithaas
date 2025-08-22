import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sun, Moon, Bell, BellOff, RefreshCw } from 'lucide-react';

interface SettingsProps {
  darkMode: boolean;
  notifications: boolean;
  dataRefreshInterval: string;
  onToggleDarkMode: () => void;
  onToggleNotifications: () => void;
  onDataRefreshIntervalChange: (interval: string) => void;
}

const refreshIntervals = [
  { value: '5min', label: '5 minutes' },
  { value: '15min', label: '15 minutes' },
  { value: '30min', label: '30 minutes' },
  { value: '1hour', label: '1 hour' }
];

export const Settings: React.FC<SettingsProps> = ({
  darkMode,
  notifications,
  dataRefreshInterval,
  onToggleDarkMode,
  onToggleNotifications,
  onDataRefreshIntervalChange
}) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your Mithaas Analytics Bot experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              Appearance
            </CardTitle>
            <CardDescription>Customize the look and feel of the application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Dark Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={onToggleDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {notifications ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for important updates
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={onToggleNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Data Management
            </CardTitle>
            <CardDescription>Configure data refresh and storage settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Data Refresh Interval</label>
              <p className="text-sm text-muted-foreground mb-3">
                How often should the application refresh analytics data?
              </p>
              <Select value={dataRefreshInterval} onValueChange={onDataRefreshIntervalChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select refresh interval" />
                </SelectTrigger>
                <SelectContent>
                  {refreshIntervals.map((interval) => (
                    <SelectItem key={interval.value} value={interval.value}>
                      {interval.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Profile Information</h4>
                <p className="text-sm text-muted-foreground">
                  Update your personal details
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button size="lg">
          Save Settings
        </Button>
      </div>
    </div>
  );
};
