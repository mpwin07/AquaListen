import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Upload, TrendingUp } from 'lucide-react';

// TODO: remove mock functionality - replace with real site data
const mockSites = [
  {
    id: 1,
    name: "Great Barrier Reef - Station A",
    lat: -16.2839,
    lng: 145.7781,
    lastHealth: "healthy",
    lastConfidence: 87.3,
    lastUpdated: "2024-01-15T10:30:00Z",
    totalPredictions: 152
  },
  {
    id: 2,
    name: "Coral Bay - Station B", 
    lat: -23.1484,
    lng: 113.7684,
    lastHealth: "stressed",
    lastConfidence: 73.1,
    lastUpdated: "2024-01-15T09:15:00Z",
    totalPredictions: 89
  },
  {
    id: 3,
    name: "Ningaloo Reef - Station C",
    lat: -21.9333,
    lng: 114.1167,
    lastHealth: "healthy",
    lastConfidence: 92.7,
    lastUpdated: "2024-01-15T11:45:00Z",
    totalPredictions: 203
  },
  {
    id: 4,
    name: "Heron Island - Station D",
    lat: -23.4426,
    lng: 151.9150,
    lastHealth: "ambient",
    lastConfidence: 81.5,
    lastUpdated: "2024-01-14T16:20:00Z",
    totalPredictions: 67
  },
  {
    id: 5,
    name: "Lizard Island - Station E",
    lat: -14.6833,
    lng: 145.4667,
    lastHealth: "stressed",
    lastConfidence: 68.9,
    lastUpdated: "2024-01-15T08:00:00Z",
    totalPredictions: 134
  }
];

interface SiteMapProps {
  onSiteSelect?: (site: any) => void;
  className?: string;
}

export function SiteMap({ onSiteSelect, className = "" }: SiteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([-20.0, 140.0], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom icons for different health statuses
    const createIcon = (health: string) => {
      const colors = {
        healthy: '#10b981', // green
        stressed: '#ef4444', // red  
        ambient: '#3b82f6'   // blue
      };
      
      return L.divIcon({
        html: `
          <div style="
            background-color: ${colors[health as keyof typeof colors] || '#6b7280'};
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>
        `,
        className: 'custom-div-icon',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
    };

    // Add site markers
    mockSites.forEach(site => {
      const marker = L.marker([site.lat, site.lng], {
        icon: createIcon(site.lastHealth)
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600;">${site.name}</h3>
          <div style="margin-bottom: 8px;">
            <span style="display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 11px; background-color: ${
              site.lastHealth === 'healthy' ? '#dcfce7' : 
              site.lastHealth === 'stressed' ? '#fecaca' : '#dbeafe'
            };">
              ${site.lastHealth.toUpperCase()}
            </span>
            <span style="font-weight: 500; margin-left: 8px;">${site.lastConfidence}%</span>
          </div>
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
            Last updated: ${new Date(site.lastUpdated).toLocaleDateString()}<br/>
            Total predictions: ${site.totalPredictions}
          </div>
          <button 
            onclick="window.selectSite(${site.id})" 
            style="
              background: #2563eb; 
              color: white; 
              border: none; 
              padding: 4px 8px; 
              border-radius: 4px; 
              cursor: pointer;
              font-size: 12px;
              margin-right: 4px;
            "
          >
            View Details
          </button>
          <button 
            onclick="window.uploadToSite(${site.id})" 
            style="
              background: #059669; 
              color: white; 
              border: none; 
              padding: 4px 8px; 
              border-radius: 4px; 
              cursor: pointer;
              font-size: 12px;
            "
          >
            Upload Audio
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      
      marker.on('click', () => {
        onSiteSelect?.(site);
      });
    });

    // Global functions for popup buttons
    (window as any).selectSite = (siteId: number) => {
      const site = mockSites.find(s => s.id === siteId);
      if (site) {
        console.log('Selected site:', site.name);
        onSiteSelect?.(site);
      }
    };

    (window as any).uploadToSite = (siteId: number) => {
      const site = mockSites.find(s => s.id === siteId);
      if (site) {
        console.log('Upload to site:', site.name);
        // TODO: trigger upload modal
      }
    };

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onSiteSelect]);

  return (
    <Card className={className} data-testid="card-site-map">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Monitoring Sites</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Healthy</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Stressed</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Ambient</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div 
          ref={mapRef} 
          style={{ height: '400px', width: '100%' }}
          className="rounded-lg border"
          data-testid="map-container"
        />
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {mockSites.length} active monitoring stations
            </span>
            <div className="flex space-x-4">
              <span className="text-green-600">
                {mockSites.filter(s => s.lastHealth === 'healthy').length} healthy
              </span>
              <span className="text-red-600">
                {mockSites.filter(s => s.lastHealth === 'stressed').length} stressed  
              </span>
              <span className="text-blue-600">
                {mockSites.filter(s => s.lastHealth === 'ambient').length} ambient
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}