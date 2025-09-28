import { useState } from 'react';
import { ModelStatusBanner } from '../ModelStatusBanner';
import { Button } from '@/components/ui/button';

export default function ModelStatusBannerExample() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const simulateLoading = () => {
    setIsLoading(true);
    setError(undefined);
    setTimeout(() => {
      setIsLoading(false);
      setModelLoaded(true);
    }, 2000);
  };

  const simulateError = () => {
    setModelLoaded(false);
    setIsLoading(false);
    setError("Connection timeout");
  };

  const simulateOffline = () => {
    setModelLoaded(false);
    setIsLoading(false);
    setError(undefined);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-2 mb-4">
        <Button onClick={simulateLoading} variant="outline" size="sm">
          Simulate Loading
        </Button>
        <Button onClick={simulateError} variant="outline" size="sm">
          Simulate Error  
        </Button>
        <Button onClick={simulateOffline} variant="outline" size="sm">
          Simulate Offline
        </Button>
        <Button onClick={() => setModelLoaded(true)} variant="outline" size="sm">
          Load Model
        </Button>
      </div>

      <ModelStatusBanner
        isModelLoaded={modelLoaded}
        isLoading={isLoading}
        error={error}
        onRetry={() => {
          console.log('Retrying model load...');
          simulateLoading();
        }}
      />
      
      <div className="p-4 bg-muted rounded">
        <p className="text-sm">
          Status: {modelLoaded ? 'Loaded' : 'Not Loaded'} | 
          Loading: {isLoading ? 'Yes' : 'No'} | 
          Error: {error || 'None'}
        </p>
      </div>
    </div>
  );
}