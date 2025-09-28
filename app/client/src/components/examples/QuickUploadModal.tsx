import { QuickUploadModal } from '../QuickUploadModal';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function QuickUploadModalExample() {
  const handleUpload = (data: any) => {
    console.log('Upload data:', data);
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-4">Quick Upload Modal</h3>
        
        <div className="flex space-x-4">
          <QuickUploadModal onUpload={handleUpload} />
          
          <QuickUploadModal 
            onUpload={handleUpload}
            trigger={
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Custom Trigger
              </Button>
            }
          />
        </div>
      </div>
      
      <div className="p-4 bg-muted rounded">
        <p className="text-sm text-muted-foreground">
          Click the buttons above to open the quick upload modal. 
          Select an audio file, choose a monitoring site, and optionally add notes.
        </p>
      </div>
    </div>
  );
}