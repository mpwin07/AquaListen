import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { AlertCard } from '@/components/AlertCard';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Settings, Filter } from 'lucide-react';

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  severity: 'critical' | 'warning' | 'info';
  enabled: boolean;
  actions: string[];
}

export default function Alerts() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'rules'>('alerts');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // TODO: remove mock functionality - replace with real data
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      severity: 'critical' as const,
      title: 'Critical Reef Health Alert',
      message: 'Confidence level dropped below 50% for the third consecutive reading at Great Barrier Reef - Station A. Immediate attention required.',
      site: 'Great Barrier Reef - Station A',
      confidence: 42.3,
      timestamp: '2024-01-15T10:30:00Z',
      resolved: false
    },
    {
      id: '2',
      severity: 'warning' as const,
      title: 'Low Confidence Reading',
      message: 'Recent prediction has confidence below 75%. Consider re-recording or submitting multiple samples.',
      site: 'Coral Bay - Station B',
      confidence: 68.9,
      timestamp: '2024-01-15T09:15:00Z',
      resolved: false
    },
    {
      id: '3',
      severity: 'info' as const,
      title: 'Batch Analysis Complete',
      message: 'Successfully processed 15 audio samples with average confidence of 87.3%.',
      site: 'Ningaloo Reef - Station C',
      confidence: 87.3,
      timestamp: '2024-01-15T08:00:00Z',
      resolved: true
    },
    {
      id: '4',
      severity: 'warning' as const,
      title: 'Model Performance Degraded',
      message: 'Processing time increased by 40% compared to baseline. Model may need optimization.',
      timestamp: '2024-01-14T16:20:00Z',
      resolved: false
    }
  ]);

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'Critical Confidence Alert',
      condition: 'confidence < 50',
      threshold: 50,
      severity: 'critical',
      enabled: true,
      actions: ['email', 'notification']
    },
    {
      id: '2', 
      name: 'Low Confidence Warning',
      condition: 'confidence < 75',
      threshold: 75,
      severity: 'warning',
      enabled: true,
      actions: ['notification']
    },
    {
      id: '3',
      name: 'Stressed Reef Detection',
      condition: 'health_status = stressed AND confidence >= 80',
      threshold: 80,
      severity: 'warning',
      enabled: true,
      actions: ['email', 'notification']
    }
  ]);

  const [newRule, setNewRule] = useState({
    name: '',
    condition: 'confidence',
    threshold: 70,
    severity: 'warning' as const,
    actions: ['notification']
  });

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
    console.log('Alert resolved:', alertId);
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    console.log('Alert dismissed:', alertId);
  };

  const handleToggleRule = (ruleId: string) => {
    setAlertRules(prev => prev.map(rule =>
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRule.name) {
      alert('Please enter a rule name');
      return;
    }

    const rule: AlertRule = {
      id: Math.random().toString(36),
      name: newRule.name,
      condition: `${newRule.condition} ${newRule.condition === 'confidence' ? '<' : '='} ${newRule.threshold}`,
      threshold: newRule.threshold,
      severity: newRule.severity,
      enabled: true,
      actions: newRule.actions
    };

    setAlertRules(prev => [...prev, rule]);
    setNewRule({
      name: '',
      condition: 'confidence',
      threshold: 70,
      severity: 'warning',
      actions: ['notification']
    });

    console.log('Created alert rule:', rule);
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'resolved' && alert.resolved) ||
      (statusFilter === 'unresolved' && !alert.resolved);
    
    return matchesSeverity && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      total: alerts.length,
      unresolved: alerts.filter(a => !a.resolved).length,
      critical: alerts.filter(a => a.severity === 'critical' && !a.resolved).length,
      warning: alerts.filter(a => a.severity === 'warning' && !a.resolved).length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6" data-testid="page-alerts">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alert Center</h1>
          <p className="text-muted-foreground mt-1">
            Monitor system alerts and configure notification rules
          </p>
        </div>
        <Button 
          onClick={() => console.log('Request notification permission')}
          variant="outline"
        >
          <Bell className="w-4 h-4 mr-2" />
          Enable Notifications
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{statusCounts.total}</div>
            <div className="text-sm text-muted-foreground">Total Alerts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.unresolved}</div>
            <div className="text-sm text-muted-foreground">Unresolved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts.critical}</div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{statusCounts.warning}</div>
            <div className="text-sm text-muted-foreground">Warning</div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'alerts' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('alerts')}
          className="px-6"
          data-testid="tab-alerts"
        >
          Alerts
        </Button>
        <Button
          variant={activeTab === 'rules' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('rules')}
          className="px-6"
          data-testid="tab-rules"
        >
          Rules
        </Button>
      </div>

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          {/* Filters */}
          <Card data-testid="card-alert-filters">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger data-testid="select-severity-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger data-testid="select-status-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="unresolved">Unresolved</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert List */}
          <div className="space-y-4">
            {filteredAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                {...alert}
                onResolve={handleResolveAlert}
                onDismiss={handleDismissAlert}
              />
            ))}
            
            {filteredAlerts.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No alerts match your filters</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          {/* Create New Rule */}
          <Card data-testid="card-create-rule">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create Alert Rule</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateRule} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rule-name">Rule Name</Label>
                    <Input
                      id="rule-name"
                      placeholder="e.g., Low Confidence Alert"
                      value={newRule.name}
                      onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                      data-testid="input-rule-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Condition</Label>
                    <Select 
                      value={newRule.condition} 
                      onValueChange={(value) => setNewRule(prev => ({ ...prev, condition: value }))}
                    >
                      <SelectTrigger data-testid="select-condition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confidence">Confidence Below</SelectItem>
                        <SelectItem value="health_status">Health Status Equals</SelectItem>
                        <SelectItem value="processing_time">Processing Time Above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="threshold">Threshold</Label>
                    <Input
                      id="threshold"
                      type="number"
                      value={newRule.threshold}
                      onChange={(e) => setNewRule(prev => ({ ...prev, threshold: Number(e.target.value) }))}
                      data-testid="input-threshold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <Select 
                      value={newRule.severity} 
                      onValueChange={(value: any) => setNewRule(prev => ({ ...prev, severity: value }))}
                    >
                      <SelectTrigger data-testid="select-severity">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" data-testid="button-create-rule">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Rule
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Rules */}
          <Card data-testid="card-existing-rules">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Alert Rules ({alertRules.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map(rule => (
                  <div 
                    key={rule.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                    data-testid={`rule-item-${rule.id}`}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{rule.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        When {rule.condition}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge 
                          variant={
                            rule.severity === 'critical' ? 'destructive' :
                            rule.severity === 'warning' ? 'secondary' : 'outline'
                          }
                        >
                          {rule.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Actions: {rule.actions.join(', ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`rule-${rule.id}`} className="text-sm">
                          {rule.enabled ? 'Enabled' : 'Disabled'}
                        </Label>
                        <Switch
                          id={`rule-${rule.id}`}
                          checked={rule.enabled}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                          data-testid={`switch-rule-${rule.id}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}