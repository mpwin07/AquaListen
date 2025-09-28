import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, MapPin, AlertTriangle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

function StatCard({ title, value, change, changeLabel, icon: Icon, className = "" }: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  
  return (
    <Card className={`hover-elevate ${className}`} data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" data-testid="text-stat-value">{value}</div>
        {change !== undefined && (
          <div className="flex items-center space-x-2 mt-2">
            {isPositive && <TrendingUp className="w-3 h-3 text-green-600" />}
            {isNegative && <TrendingDown className="w-3 h-3 text-red-600" />}
            <span 
              className={`text-xs ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'}`}
              data-testid="text-change"
            >
              {isPositive ? '+' : ''}{change}% {changeLabel}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  className?: string;
}

export function DashboardStats({ className = "" }: DashboardStatsProps) {
  // TODO: remove mock functionality - replace with real data
  const stats = {
    totalSites: 24,
    sitesChange: 8.3,
    healthySites: 18,
    healthyChange: 5.2,
    activePredictions: 1247,
    predictionsChange: 12.1,
    activeAlerts: 3,
    alertsChange: -25.0
  };

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`} data-testid="dashboard-stats">
      <StatCard
        title="Total Sites"
        value={stats.totalSites}
        change={stats.sitesChange}
        changeLabel="from last month"
        icon={MapPin}
      />
      
      <StatCard
        title="Healthy Sites"
        value={stats.healthySites}
        change={stats.healthyChange}
        changeLabel="from last month"
        icon={Activity}
      />
      
      <StatCard
        title="Total Predictions"
        value={stats.activePredictions.toLocaleString()}
        change={stats.predictionsChange}
        changeLabel="from last month"
        icon={TrendingUp}
      />
      
      <StatCard
        title="Active Alerts"
        value={stats.activeAlerts}
        change={stats.alertsChange}
        changeLabel="from last month"
        icon={AlertTriangle}
      />
    </div>
  );
}