import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SiteMap } from '@/components/SiteMap';
import { QuickUploadModal } from '@/components/QuickUploadModal';
import { Search, Filter, MapPin, Calendar, TrendingUp, Upload } from 'lucide-react';
import { useSites } from '@/contexts/SitesContext';

export default function Sites() {
  const { sites } = useSites();
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (site.region && site.region.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || site.lastHealth === statusFilter;
    const matchesRegion = regionFilter === 'all' || site.region === regionFilter;
    
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const handleSiteSelect = (site: any) => {
    setSelectedSite(site);
  };

  const handleQuickUpload = (data: any) => {
    console.log('Quick upload for site:', data);
    setIsUploadModalOpen(false);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Monitoring Sites</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all monitoring sites and their health status
          </p>
        </div>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Quick Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <SiteMap onSiteSelect={handleSiteSelect} />
        </div>

        {/* Site List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sites..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2 opacity-50" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="stressed">Stressed</SelectItem>
                <SelectItem value="ambient">Ambient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Monitoring Sites</h3>
                <span className="text-sm text-muted-foreground">
                  {filteredSites.length} {filteredSites.length === 1 ? 'site' : 'sites'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredSites.length > 0 ? (
                <div className="divide-y">
                  {filteredSites.map((site) => (
                    <div 
                      key={site.id}
                      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                        selectedSite?.id === site.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => handleSiteSelect(site)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{site.name}</h4>
                        <Badge className={getHealthBadgeColor(site.lastHealth)}>
                          {site.lastHealth.charAt(0).toUpperCase() + site.lastHealth.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 mr-1.5" />
                        <span>{site.region || 'Unknown region'}</span>
                        <span className="mx-2">•</span>
                        <span>{site.lastConfidence.toFixed(1)}% confidence</span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Last updated: {new Date(site.lastUpdated).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No sites found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <QuickUploadModal 
        open={isUploadModalOpen} 
        onOpenChange={setIsUploadModalOpen} 
        onSubmit={handleQuickUpload} 
      />
    </div>
  );
}