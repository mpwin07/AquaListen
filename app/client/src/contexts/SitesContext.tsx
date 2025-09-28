import { createContext, useContext, useState, ReactNode } from 'react';

interface Site {
  id: string | number;
  name: string;
  lat: number;
  lng: number;
  lastHealth: 'healthy' | 'stressed' | 'ambient';
  lastConfidence: number;
  lastUpdated: string;
  totalPredictions: number;
}

interface SitesContextType {
  sites: Site[];
  addSite: (site: Omit<Site, 'id' | 'totalPredictions' | 'lastUpdated'>) => void;
  updateSite: (id: string | number, updates: Partial<Site>) => void;
}

const SitesContext = createContext<SitesContextType | undefined>(undefined);

export function SitesProvider({ children }: { children: ReactNode }) {
  const [sites, setSites] = useState<Site[]>([]);

  const addSite = (site: Omit<Site, 'id' | 'totalPredictions' | 'lastUpdated'>) => {
    const newSite: Site = {
      ...site,
      id: Date.now(), // Simple ID generation
      totalPredictions: 1,
      lastUpdated: new Date().toISOString(),
    };
    
    setSites(prevSites => [...prevSites, newSite]);
  };

  const updateSite = (id: string | number, updates: Partial<Site>) => {
    setSites(prevSites => 
      prevSites.map(site => 
        site.id === id 
          ? { 
              ...site, 
              ...updates, 
              lastUpdated: new Date().toISOString(),
              totalPredictions: updates.lastHealth !== undefined 
                ? site.totalPredictions + 1 
                : site.totalPredictions
            } 
          : site
      )
    );
  };

  return (
    <SitesContext.Provider value={{ sites, addSite, updateSite }}>
      {children}
    </SitesContext.Provider>
  );
}

export function useSites() {
  const context = useContext(SitesContext);
  if (context === undefined) {
    throw new Error('useSites must be used within a SitesProvider');
  }
  return context;
}
