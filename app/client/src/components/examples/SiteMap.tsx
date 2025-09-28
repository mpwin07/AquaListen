import { SiteMap } from '../SiteMap';

export default function SiteMapExample() {
  const handleSiteSelect = (site: any) => {
    console.log('Site selected:', site);
  };

  return (
    <div className="p-6">
      <SiteMap onSiteSelect={handleSiteSelect} />
    </div>
  );
}