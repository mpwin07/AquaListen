import { useState, useCallback, useRef } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

interface FileUploadAreaProps {
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedFormats?: string[];
  onFilesSelected?: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;
  className?: string;
  multiple?: boolean;
}

export function FileUploadArea({
  maxFiles = 20,
  maxFileSize = 50,
  acceptedFormats = ['.wav', '.mp3', '.m4a', '.flac'],
  onFilesSelected,
  onFileRemove,
  className = "",
  multiple = true
}: FileUploadAreaProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit`;
    }

    // Check file format
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedFormats.includes(extension)) {
      return `Format not supported. Accepted: ${acceptedFormats.join(', ')}`;
    }

    return null;
  };

  const handleFileSelection = useCallback((files: FileList) => {
    const newFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach(file => {
      if (uploadFiles.length + newFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const validationError = validateFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
        return;
      }

      newFiles.push(file);
    });

    if (newFiles.length > 0) {
      const uploadFileObjects: UploadFile[] = newFiles.map(file => ({
        id: Math.random().toString(36),
        file,
        progress: 0,
        status: 'pending'
      }));

      setUploadFiles(prev => [...prev, ...uploadFileObjects]);
      onFilesSelected?.(newFiles);

      // TODO: remove mock functionality
      // Simulate upload progress
      uploadFileObjects.forEach(uploadFile => {
        setTimeout(() => {
          setUploadFiles(prev => prev.map(uf => 
            uf.id === uploadFile.id 
              ? { ...uf, status: 'uploading' }
              : uf
          ));

          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);
              setUploadFiles(prev => prev.map(uf => 
                uf.id === uploadFile.id 
                  ? { ...uf, progress: 100, status: 'completed' }
                  : uf
              ));
            } else {
              setUploadFiles(prev => prev.map(uf => 
                uf.id === uploadFile.id 
                  ? { ...uf, progress }
                  : uf
              ));
            }
          }, 200);
        }, Math.random() * 1000);
      });
    }

    if (errors.length > 0) {
      console.log('File upload errors:', errors);
    }
  }, [uploadFiles, maxFiles, maxFileSize, acceptedFormats, onFilesSelected]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelection(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelection(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadFiles(prev => prev.filter(f => f.id !== fileId));
    onFileRemove?.(fileId);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card 
        className={`
          border-2 border-dashed transition-colors cursor-pointer hover-elevate
          ${isDragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        data-testid="dropzone-upload"
      >
        <div className="p-8 text-center">
          <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {multiple ? 'Drop files here or click to browse' : 'Drop file here or click to browse'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Supported formats: {acceptedFormats.join(', ')} 
            <br />
            Max file size: {maxFileSize}MB
            {multiple && ` • Max files: ${maxFiles}`}
          </p>
          <Button variant="outline" data-testid="button-browse-files">
            Browse Files
          </Button>
        </div>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={acceptedFormats.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
        data-testid="input-file-hidden"
      />

      {uploadFiles.length > maxFiles && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Maximum {maxFiles} files allowed. Please remove some files before uploading.
          </AlertDescription>
        </Alert>
      )}

      {uploadFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Files ({uploadFiles.length})</h4>
          {uploadFiles.map((uploadFile) => (
            <Card key={uploadFile.id} className="p-3" data-testid={`card-file-${uploadFile.id}`}>
              <div className="flex items-center space-x-3">
                <File className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" data-testid="text-filename">
                    {uploadFile.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(uploadFile.file.size)}
                  </p>
                  {uploadFile.status !== 'pending' && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>
                          {uploadFile.status === 'completed' ? 'Completed' : 'Uploading...'}
                        </span>
                        <span>{uploadFile.progress.toFixed(0)}%</span>
                      </div>
                      <Progress 
                        value={uploadFile.progress} 
                        className="h-1" 
                        data-testid="progress-upload"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={
                      uploadFile.status === 'completed' ? 'default' :
                      uploadFile.status === 'error' ? 'destructive' :
                      uploadFile.status === 'uploading' ? 'secondary' : 'outline'
                    }
                    data-testid={`badge-status-${uploadFile.status}`}
                  >
                    {uploadFile.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(uploadFile.id)}
                    className="h-6 w-6"
                    data-testid={`button-remove-${uploadFile.id}`}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}