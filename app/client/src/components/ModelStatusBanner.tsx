import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Loader2, RefreshCw } from "lucide-react";

interface ModelStatusBannerProps {
  isModelLoaded: boolean;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  className?: string;
}

export function ModelStatusBanner({
  isModelLoaded,
  isLoading = false,
  error,
  onRetry,
  className = ""
}: ModelStatusBannerProps) {
  if (isModelLoaded && !isLoading && !error) {
    return null; // Don't show banner when everything is working
  }

  const getStatus = () => {
    if (isLoading) {
      return {
        icon: Loader2,
        variant: "default" as const,
        title: "Loading AI Model",
        message: "The reef health prediction model is initializing. Please wait...",
        iconClass: "animate-spin"
      };
    }
    
    if (error) {
      return {
        icon: AlertTriangle,
        variant: "destructive" as const,
        title: "Model Error",
        message: `Failed to load AI model: ${error}. Predictions may be unavailable.`,
        iconClass: "text-destructive"
      };
    }

    return {
      icon: AlertTriangle,
      variant: "default" as const,
      title: "Model Unavailable",
      message: "The AI model is not loaded. The dashboard is operating in simulation mode with approximate predictions.",
      iconClass: "text-yellow-600"
    };
  };

  const status = getStatus();
  const Icon = status.icon;

  return (
    <Alert variant={status.variant} className={className} data-testid="alert-model-status">
      <Icon className={`h-4 w-4 ${status.iconClass}`} />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <strong>{status.title}:</strong> {status.message}
        </div>
        {onRetry && (error || !isModelLoaded) && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            disabled={isLoading}
            className="ml-4"
            data-testid="button-retry-model"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}