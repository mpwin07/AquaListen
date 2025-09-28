import { useState } from 'react';
import { AlertCard } from '../AlertCard';

export default function AlertCardExample() {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      severity: 'critical' as const,
      title: 'Reef Health Critical',
      message: 'Confidence level dropped below 50% for the third consecutive reading. Immediate attention required.',
      site: 'Great Barrier Reef - Station A',
      confidence: 42.3,
      timestamp: '2024-01-15T10:30:00Z',
      resolved: false
    },
    {
      id: '2',
      severity: 'warning' as const,
      title: 'Low Confidence Reading',
      message: 'Recent prediction has confidence below 75%. Consider re-recording or submitting additional samples.',
      site: 'Coral Bay - Station B',
      confidence: 68.9,
      timestamp: '2024-01-15T09:15:00Z',
      resolved: false
    },
    {
      id: '3',
      severity: 'info' as const,
      title: 'Analysis Complete',
      message: 'Batch processing of 12 audio samples completed successfully with high confidence scores.',
      site: 'Ningaloo Reef - Station C',
      confidence: 89.7,
      timestamp: '2024-01-15T08:00:00Z',
      resolved: true
    }
  ]);

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
    console.log('Alert resolved:', alertId);
  };

  const handleDismiss = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    console.log('Alert dismissed:', alertId);
  };

  return (
    <div className="p-6 max-w-2xl space-y-4">
      <h3 className="text-lg font-medium mb-4">Alert Examples</h3>
      
      {alerts.map(alert => (
        <AlertCard
          key={alert.id}
          {...alert}
          onResolve={handleResolve}
          onDismiss={handleDismiss}
        />
      ))}
    </div>
  );
}