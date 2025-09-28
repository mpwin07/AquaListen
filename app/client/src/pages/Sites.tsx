import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SiteMap } from '@/components/SiteMap';
import { QuickUploadModal } from '@/components/QuickUploadModal';
import { Search, Filter, MapPin, Calendar, TrendingUp, Upload } from 'lucide-react';

export default function Sites() {
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  // TODO: remove mock functionality - replace with real sites data
  const mockSites = [
    {
      id: 1,
      name: "Great Barrier Reef - Station A",
      region: "Queensland",
      lat: -16.2839,
      lng: 145.7781,
      lastHealth: "healthy",
      lastConfidence: 87.3,
      lastUpdated: "2024-01-15T10:30:00Z",
      totalPredictions: 152,
      recentHistory: [
        { date: '2024-01-15', health: 'healthy', confidence: 87.3 },
        { date: '2024-01-14', health: 'healthy', confidence: 89.1 },
        { date: '2024-01-13', health: 'stressed', confidence: 72.4 },
        { date: '2024-01-12', health: 'healthy', confidence: 85.7 },
        { date: '2024-01-11', health: 'healthy', confidence: 91.2 }
      ]
    },
    {
      id: 2,
      name: "Coral Bay - Station B", 
      region: "Western Australia",
      lat: -23.1484,
      lng: 113.7684,
      lastHealth: "stressed",
      lastConfidence: 73.1,
      lastUpdated: "2024-01-15T09:15:00Z",
      totalPredictions: 89,
      recentHistory: [
        { date: '2024-01-15', health: 'stressed', confidence: 73.1 },
        { date: '2024-01-14', health: 'stressed', confidence: 68.9 },
        { date: '2024-01-13', health: 'stressed', confidence: 71.2 },
        { date: '2024-01-12', health: 'ambient', confidence: 82.3 },
        { date: '2024-01-11', health: 'healthy', confidence: 88.7 }
      ]
    },
    {
      id: 3,
      name: "Ningaloo Reef - Station C",
      region: "Western Australia", 
      lat: -21.9333,
      lng: 114.1167,
      lastHealth: "healthy",
      lastConfidence: 92.7,
      lastUpdated: "2024-01-15T11:45:00Z",
      totalPredictions: 203,
      recentHistory: [
        { date: '2024-01-15', health: 'healthy', confidence: 92.7 },
        { date: '2024-01-14', health: 'healthy', confidence: 94.1 },
        { date: '2024-01-13', health: 'healthy', confidence: 89.8 },
        { date: '2024-01-12', health: 'healthy', confidence: 91.5 },
        { date: '2024-01-11', health: 'ambient', confidence: 86.3 }
      ]
    }
  ];

  const filteredSites = mockSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || site.lastHealth === statusFilter;
    const matchesRegion = regionFilter === 'all' || site.region === regionFilter;
    
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const handleSiteSelect = (site: any) => {
    setSelectedSite(site);
  };

  const handleQuickUpload = (data: any) => {
    console.log('Quick upload for site:', data);
  };

  const getHealthBadgeColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'stressed': return 'bg-red-100 text-red-800';
      case 'ambient': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6" data-testid="page-sites">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Monitoring Sites</h1>
          <p className="text-muted-foreground mt-1">
            Interactive map and detailed information for all reef monitoring stations
          </p>
        </div>
        <QuickUploadModal 
          onUpload={handleQuickUpload}
          trigger={
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload to Site
            </Button>
          }
        />
      </div>

      {/* Filters */}
      <Card data-testid="card-filters">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search sites or regions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Health Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger data-testid="select-status-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="stressed">Stressed</SelectItem>
                  <SelectItem value="ambient">Ambient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger data-testid="select-region-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Queensland">Queensland</SelectItem>
                  <SelectItem value="Western Australia">Western Australia</SelectItem>
                  <SelectItem value="Northern Territory">Northern Territory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select defaultValue="7days">
                <SelectTrigger data-testid="select-date-range">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1day">Last 24 hours</SelectItem>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Map */}
        <div className="xl:col-span-3">
          <SiteMap onSiteSelect={handleSiteSelect} />
        </div>

        {/* Site List */}
        <Card data-testid="card-site-list">
          <CardHeader>
            <CardTitle>Site List ({filteredSites.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredSites.map(site => (
                <div
                  key={site.id}
                  className={`p-3 border rounded-lg cursor-pointer hover-elevate transition-colors ${
                    selectedSite?.id === site.id ? 'bg-primary/5 border-primary' : ''
                  }`}
                  onClick={() => handleSiteSelect(site)}
                  data-testid={`site-item-${site.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm leading-tight">{site.name}</h4>
                    <Badge className={getHealthBadgeColor(site.lastHealth)}>
                      {site.lastHealth}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {site.region}
                    </p>
                    <p className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {site.lastConfidence.toFixed(1)}% confidence
                    </p>
                    <p className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(site.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {filteredSites.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No sites match your filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Site Details */}
      {selectedSite && (
        <Card data-testid="card-site-details">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedSite.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className={getHealthBadgeColor(selectedSite.lastHealth)}>
                  {selectedSite.lastHealth.toUpperCase()}
                </Badge>
                <QuickUploadModal 
                  onUpload={handleQuickUpload}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Audio
                    </Button>
                  }
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Site Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Site Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Region:</span> {selectedSite.region}</p>
                    <p><span className="font-medium">Coordinates:</span> {selectedSite.lat.toFixed(4)}, {selectedSite.lng.toFixed(4)}</p>
                    <p><span className="font-medium">Total Predictions:</span> {selectedSite.totalPredictions}</p>
                    <p><span className="font-medium">Last Updated:</span> {new Date(selectedSite.lastUpdated).toLocaleString()}</p>
                    <p><span className="font-medium">Current Confidence:</span> {selectedSite.lastConfidence.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              {/* Recent History */}
              <div>
                <h4 className="font-medium mb-2">Recent Predictions (Last 5)</h4>
                <div className="space-y-2">
                  {selectedSite.recentHistory.map((record: any, index: number) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded text-sm"
                    >
                      <span>{new Date(record.date).toLocaleDateString()}</span>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={getHealthBadgeColor(record.health)}
                        >
                          {record.health}
                        </Badge>
                        <span className="text-muted-foreground">
                          {record.confidence.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}