import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ConfidenceGaugeProps {
  confidence: number;
  previousConfidence?: number;
  label?: string;
  showTrend?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ConfidenceGauge({
  confidence,
  previousConfidence,
  label = "Confidence",
  showTrend = false,
  size = 'md',
  className = ""
}: ConfidenceGaugeProps) {
  const getConfidenceLevel = (conf: number) => {
    if (conf >= 90) return { label: 'Excellent', color: 'bg-green-500' };
    if (conf >= 80) return { label: 'High', color: 'bg-green-400' };
    if (conf >= 70) return { label: 'Good', color: 'bg-yellow-500' };
    if (conf >= 60) return { label: 'Moderate', color: 'bg-orange-500' };
    return { label: 'Low', color: 'bg-red-500' };
  };

  const level = getConfidenceLevel(confidence);
  const trend = previousConfidence !== undefined ? confidence - previousConfidence : 0;
  
  const sizes = {
    sm: { card: 'p-3', title: 'text-sm', value: 'text-lg', progress: 'h-1' },
    md: { card: 'p-4', title: 'text-base', value: 'text-2xl', progress: 'h-2' },
    lg: { card: 'p-6', title: 'text-lg', value: 'text-3xl', progress: 'h-3' }
  };

  const sizeConfig = sizes[size];

  const getTrendIcon = () => {
    if (Math.abs(trend) < 1) return Minus;
    return trend > 0 ? TrendingUp : TrendingDown;
  };

  const TrendIcon = getTrendIcon();

  return (
    <Card className={`hover-elevate ${className}`} data-testid="card-confidence-gauge">
      <CardHeader className={`${sizeConfig.card} pb-2`}>
        <CardTitle className={`${sizeConfig.title} font-medium text-muted-foreground`}>
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className={`${sizeConfig.card} pt-0`}>
        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <div className={`${sizeConfig.value} font-bold`} data-testid="text-confidence-value">
              {confidence.toFixed(1)}%
            </div>
            <Badge 
              className={level.color}
              variant="secondary"
              data-testid="badge-confidence-level"
            >
              {level.label}
            </Badge>
          </div>

          <div className="space-y-2">
            <Progress 
              value={confidence} 
              className={sizeConfig.progress}
              data-testid="progress-confidence"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {showTrend && previousConfidence !== undefined && (
            <div className="flex items-center space-x-2 pt-2 border-t">
              <TrendIcon 
                className={`w-3 h-3 ${
                  trend > 0 ? 'text-green-600' : 
                  trend < 0 ? 'text-red-600' : 
                  'text-muted-foreground'
                }`} 
              />
              <span 
                className={`text-xs ${
                  trend > 0 ? 'text-green-600' : 
                  trend < 0 ? 'text-red-600' : 
                  'text-muted-foreground'
                }`}
                data-testid="text-trend"
              >
                {trend > 0 ? '+' : ''}{trend.toFixed(1)}% from last reading
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}