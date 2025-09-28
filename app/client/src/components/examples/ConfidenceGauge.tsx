import { ConfidenceGauge } from '../ConfidenceGauge';

export default function ConfidenceGaugeExample() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Confidence Gauge Examples</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ConfidenceGauge
            confidence={92.7}
            previousConfidence={89.1}
            label="Current Prediction"
            showTrend={true}
            size="md"
          />
          
          <ConfidenceGauge
            confidence={68.4}
            previousConfidence={74.2}
            label="Average (24h)"
            showTrend={true}
            size="md"
          />
          
          <ConfidenceGauge
            confidence={45.1}
            previousConfidence={47.8}
            label="Minimum Threshold"
            showTrend={true}
            size="md"
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4">Different Sizes</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ConfidenceGauge
            confidence={85.3}
            label="Small"
            size="sm"
          />
          
          <ConfidenceGauge
            confidence={85.3}
            label="Medium"
            size="md"
          />
          
          <ConfidenceGauge
            confidence={85.3}
            label="Large"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}