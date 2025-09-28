import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Waves, AlertTriangle, CheckCircle } from "lucide-react";

type HealthStatus = 'healthy' | 'stressed' | 'ambient';

interface HealthStatusCardProps {
  status: HealthStatus;
  confidence: number;
  filename?: string;
  timestamp?: string;
  site?: string;
  className?: string;
}

export function HealthStatusCard({ 
  status, 
  confidence, 
  filename, 
  timestamp, 
  site,
  className = ""
}: HealthStatusCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'healthy':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'stressed':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: AlertTriangle,
          iconColor: 'text-red-600'
        };
      case 'ambient':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Waves,
          iconColor: 'text-blue-600'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card className={`hover-elevate ${className}`} data-testid={`card-health-${status}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Reef Health Status</CardTitle>
          <Icon className={`w-4 h-4 ${config.iconColor}`} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className={config.color} data-testid={`badge-status-${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <span className="text-sm font-medium" data-testid="text-confidence">
            {confidence.toFixed(1)}%
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Confidence</span>
            <span className="font-medium">{confidence.toFixed(1)}%</span>
          </div>
          <Progress value={confidence} className="h-2" data-testid="progress-confidence" />
        </div>

        {(filename || site || timestamp) && (
          <div className="space-y-1 pt-2 border-t">
            {filename && (
              <p className="text-xs text-muted-foreground" data-testid="text-filename">
                File: {filename}
              </p>
            )}
            {site && (
              <p className="text-xs text-muted-foreground" data-testid="text-site">
                Site: {site}
              </p>
            )}
            {timestamp && (
              <p className="text-xs text-muted-foreground" data-testid="text-timestamp">
                {new Date(timestamp).toLocaleString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}