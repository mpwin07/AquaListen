import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon,
  User,
  Server,
  Bell,
  Map,
  Save,
  RotateCcw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function Settings() {
  // API Settings
  const [apiBaseUrl, setApiBaseUrl] = useState('http://localhost:8000');
  const [apiTimeout, setApiTimeout] = useState(30);
  const [apiRetries, setApiRetries] = useState(3);

  // User Profile
  const [userName, setUserName] = useState('Marine Researcher');
  const [userEmail, setUserEmail] = useState('researcher@aqua-listen.com');
  const [userRole, setUserRole] = useState('analyst');

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState(75);
  const [notificationFrequency, setNotificationFrequency] = useState('immediate');

  // Map Settings
  const [mapProvider, setMapProvider] = useState('openstreetmap');
  const [mapboxToken, setMapboxToken] = useState('');
  const [defaultZoom, setDefaultZoom] = useState(5);
  const [defaultCenter, setDefaultCenter] = useState('-20.0, 140.0');

  // System Settings
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(60);
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('en');

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      // TODO: remove mock functionality - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const settings = {
        api: { baseUrl: apiBaseUrl, timeout: apiTimeout, retries: apiRetries },
        user: { name: userName, email: userEmail, role: userRole },
        notifications: { 
          email: emailNotifications, 
          push: pushNotifications, 
          threshold: alertThreshold,
          frequency: notificationFrequency
        },
        map: { provider: mapProvider, mapboxToken, defaultZoom, defaultCenter },
        system: { autoRefresh, refreshInterval, theme, language }
      };

      console.log('Settings saved:', settings);
      setSaveStatus('success');
      
      setTimeout(() => setSaveStatus('idle'), 3000);
      
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    // Reset to defaults
    setApiBaseUrl('http://localhost:8000');
    setApiTimeout(30);
    setApiRetries(3);
    setUserName('Marine Researcher');
    setUserEmail('researcher@aqua-listen.com');
    setUserRole('analyst');
    setEmailNotifications(true);
    setPushNotifications(false);
    setAlertThreshold(75);
    setNotificationFrequency('immediate');
    setMapProvider('openstreetmap');
    setMapboxToken('');
    setDefaultZoom(5);
    setDefaultCenter('-20.0, 140.0');
    setAutoRefresh(true);
    setRefreshInterval(60);
    setTheme('system');
    setLanguage('en');
    setSaveStatus('idle');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" data-testid="page-settings">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your AquaListen dashboard preferences and integrations
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleReset}
            data-testid="button-reset"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            data-testid="button-save"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Save Status Alert */}
      {saveStatus !== 'idle' && (
        <Alert className={saveStatus === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          {saveStatus === 'success' ? 
            <CheckCircle className="h-4 w-4 text-green-600" /> : 
            <AlertTriangle className="h-4 w-4 text-red-600" />
          }
          <AlertDescription>
            {saveStatus === 'success' ? 
              'Settings saved successfully!' : 
              'Failed to save settings. Please try again.'
            }
          </AlertDescription>
        </Alert>
      )}

      {/* User Profile */}
      <Card data-testid="card-user-profile">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>User Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Display Name</Label>
              <Input
                id="user-name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                data-testid="input-user-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user-email">Email</Label>
              <Input
                id="user-email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                data-testid="input-user-email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger data-testid="select-user-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="analyst">Research Analyst</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card data-testid="card-api-config">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5" />
            <span>API Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-base-url">Base URL</Label>
            <Input
              id="api-base-url"
              value={apiBaseUrl}
              onChange={(e) => setApiBaseUrl(e.target.value)}
              placeholder="http://localhost:8000"
              data-testid="input-api-url"
            />
            <p className="text-xs text-muted-foreground">
              URL of the FastAPI backend server
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="api-timeout">Request Timeout (seconds)</Label>
              <Input
                id="api-timeout"
                type="number"
                value={apiTimeout}
                onChange={(e) => setApiTimeout(Number(e.target.value))}
                data-testid="input-api-timeout"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-retries">Retry Attempts</Label>
              <Input
                id="api-retries"
                type="number"
                value={apiRetries}
                onChange={(e) => setApiRetries(Number(e.target.value))}
                data-testid="input-api-retries"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card data-testid="card-notifications">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive alerts via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              data-testid="switch-email-notifications"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Browser Notifications</Label>
              <p className="text-sm text-muted-foreground">Show desktop notifications</p>
            </div>
            <Switch
              id="push-notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
              data-testid="switch-push-notifications"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alert-threshold">Alert Confidence Threshold (%)</Label>
            <Input
              id="alert-threshold"
              type="number"
              min="0"
              max="100"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
              data-testid="input-alert-threshold"
            />
            <p className="text-xs text-muted-foreground">
              Trigger alerts when confidence falls below this value
            </p>
          </div>

          <div className="space-y-2">
            <Label>Notification Frequency</Label>
            <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
              <SelectTrigger data-testid="select-notification-frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Summary</SelectItem>
                <SelectItem value="daily">Daily Summary</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Map Settings */}
      <Card data-testid="card-map-settings">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Map className="w-5 h-5" />
            <span>Map Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Map Provider</Label>
            <Select value={mapProvider} onValueChange={setMapProvider}>
              <SelectTrigger data-testid="select-map-provider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openstreetmap">OpenStreetMap (Free)</SelectItem>
                <SelectItem value="mapbox">Mapbox (Requires API Key)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mapProvider === 'mapbox' && (
            <div className="space-y-2">
              <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
              <Input
                id="mapbox-token"
                type="password"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="pk.ey..."
                data-testid="input-mapbox-token"
              />
              <p className="text-xs text-muted-foreground">
                Required for enhanced map features and styling
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="default-zoom">Default Zoom Level</Label>
              <Input
                id="default-zoom"
                type="number"
                min="1"
                max="18"
                value={defaultZoom}
                onChange={(e) => setDefaultZoom(Number(e.target.value))}
                data-testid="input-default-zoom"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-center">Default Center (lat, lng)</Label>
              <Input
                id="default-center"
                value={defaultCenter}
                onChange={(e) => setDefaultCenter(e.target.value)}
                placeholder="-20.0, 140.0"
                data-testid="input-default-center"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card data-testid="card-system-preferences">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5" />
            <span>System Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-refresh">Auto Refresh Data</Label>
              <p className="text-sm text-muted-foreground">Automatically update dashboard data</p>
            </div>
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              data-testid="switch-auto-refresh"
            />
          </div>

          {autoRefresh && (
            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
              <Input
                id="refresh-interval"
                type="number"
                min="10"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                data-testid="input-refresh-interval"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger data-testid="select-theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger data-testid="select-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}