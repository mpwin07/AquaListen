import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUploadArea } from "./FileUploadArea";
import { Upload } from "lucide-react";

interface QuickUploadModalProps {
  trigger?: React.ReactNode;
  onUpload?: (data: UploadData) => void;
  className?: string;
}

interface UploadData {
  files: File[];
  site: string;
  notes: string;
  timestamp?: string;
}

export function QuickUploadModal({ trigger, onUpload, className = "" }: QuickUploadModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedSite, setSelectedSite] = useState('');
  const [notes, setNotes] = useState('');
  const [customTimestamp, setCustomTimestamp] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // TODO: remove mock functionality - replace with real sites data
  const mockSites = [
    'Great Barrier Reef - Station A',
    'Coral Bay - Station B',
    'Ningaloo Reef - Station C',
    'Heron Island - Station D',
    'Lizard Island - Station E'
  ];

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleFileRemove = (fileId: string) => {
    // Note: This is a simplified implementation
    // In a real app, you'd track files by ID
    console.log('File removed:', fileId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      alert('Please select at least one file');
      return;
    }
    
    if (!selectedSite) {
      alert('Please select a monitoring site');
      return;
    }

    setIsUploading(true);
    
    // TODO: remove mock functionality
    // Simulate upload process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const uploadData: UploadData = {
        files: selectedFiles,
        site: selectedSite,
        notes,
        timestamp: customTimestamp || undefined
      };

      onUpload?.(uploadData);
      console.log('Upload completed:', uploadData);
      
      // Reset form
      setSelectedFiles([]);
      setSelectedSite('');
      setNotes('');
      setCustomTimestamp('');
      setOpen(false);
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const defaultTrigger = (
    <Button data-testid="button-quick-upload-trigger">
      <Upload className="w-4 h-4 mr-2" />
      Quick Upload
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl" data-testid="modal-quick-upload">
        <DialogHeader>
          <DialogTitle>Quick Audio Upload</DialogTitle>
          <DialogDescription>
            Upload audio samples and bind them to a monitoring site for reef health analysis.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FileUploadArea
            multiple={false}
            maxFiles={1}
            onFilesSelected={handleFilesSelected}
            onFileRemove={handleFileRemove}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site-select">Monitoring Site *</Label>
              <Select value={selectedSite} onValueChange={setSelectedSite}>
                <SelectTrigger data-testid="select-site">
                  <SelectValue placeholder="Select a site" />
                </SelectTrigger>
                <SelectContent>
                  {mockSites.map(site => (
                    <SelectItem key={site} value={site}>
                      {site}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timestamp">Custom Timestamp (optional)</Label>
              <Input
                id="timestamp"
                type="datetime-local"
                value={customTimestamp}
                onChange={(e) => setCustomTimestamp(e.target.value)}
                data-testid="input-timestamp"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes about this recording..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              data-testid="textarea-notes"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isUploading}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploading || selectedFiles.length === 0 || !selectedSite}
              data-testid="button-upload"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload & Analyze
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}