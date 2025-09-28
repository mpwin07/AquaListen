import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock, MapPin, X } from "lucide-react";

type AlertSeverity = 'critical' | 'warning' | 'info';

interface AlertCardProps {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  site?: string;
  confidence?: number;
  timestamp: string;
  resolved?: boolean;
  onResolve?: (id: string) => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

export function AlertCard({
  id,
  severity,
  title,
  message,
  site,
  confidence,
  timestamp,
  resolved = false,
  onResolve,
  onDismiss,
  className = ""
}: AlertCardProps) {
  const getSeverityConfig = () => {
    switch (severity) {
      case 'critical':
        return {
          color: 'bg-red-50 border-red-200 text-red-900',
          badgeColor: 'destructive' as const,
          icon: AlertTriangle,
          iconColor: 'text-red-600'
        };
      case 'warning':
        return {
          color: 'bg-yellow-50 border-yellow-200 text-yellow-900',
          badgeColor: 'secondary' as const,
          icon: AlertTriangle,
          iconColor: 'text-yellow-600'
        };
      case 'info':
        return {
          color: 'bg-blue-50 border-blue-200 text-blue-900',
          badgeColor: 'outline' as const,
          icon: CheckCircle,
          iconColor: 'text-blue-600'
        };
    }
  };

  const config = getSeverityConfig();
  const Icon = config.icon;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <Card 
      className={`${resolved ? 'opacity-60' : ''} ${className}`}
      data-testid={`card-alert-${id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Icon className={`w-5 h-5 mt-0.5 ${config.iconColor}`} />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Badge variant={config.badgeColor} data-testid={`badge-severity-${severity}`}>
                  {severity.toUpperCase()}
                </Badge>
                {resolved && (
                  <Badge variant="outline" className="text-green-600">
                    RESOLVED
                  </Badge>
                )}
              </div>
              <h3 className="font-medium text-sm" data-testid="text-alert-title">
                {title}
              </h3>
            </div>
          </div>
          
          {onDismiss && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDismiss(id)}
              className="h-6 w-6"
              data-testid={`button-dismiss-${id}`}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground" data-testid="text-alert-message">
          {message}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span data-testid="text-timestamp">{formatTimestamp(timestamp)}</span>
            </div>
            {site && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span data-testid="text-site">{site}</span>
              </div>
            )}
            {confidence && (
              <span data-testid="text-confidence">
                Confidence: {confidence.toFixed(1)}%
              </span>
            )}
          </div>
          
          {onResolve && !resolved && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onResolve(id)}
              className="h-6 text-xs px-2"
              data-testid={`button-resolve-${id}`}
            >
              Mark Resolved
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}