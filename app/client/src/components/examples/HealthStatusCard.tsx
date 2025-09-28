import { HealthStatusCard } from '../HealthStatusCard';

export default function HealthStatusCardExample() {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HealthStatusCard
          status="healthy"
          confidence={87.3}
          filename="reef_sample_001.wav"
          site="Great Barrier Reef - Station A"
          timestamp="2024-01-15T10:30:00Z"
        />
        
        <HealthStatusCard
          status="stressed"
          confidence={73.1}
          filename="reef_sample_002.wav"
          site="Coral Bay - Station B"
          timestamp="2024-01-15T09:15:00Z"
        />
        
        <HealthStatusCard
          status="ambient"
          confidence={91.7}
          filename="ocean_background.wav"
          site="Deep Ocean - Station C"
          timestamp="2024-01-15T11:45:00Z"
        />
      </div>
    </div>
  );
}