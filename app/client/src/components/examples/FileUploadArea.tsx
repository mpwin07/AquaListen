import { FileUploadArea } from '../FileUploadArea';

export default function FileUploadAreaExample() {
  const handleFilesSelected = (files: File[]) => {
    console.log('Files selected:', files.map(f => f.name));
  };

  const handleFileRemove = (fileId: string) => {
    console.log('File removed:', fileId);
  };

  return (
    <div className="p-6 max-w-2xl space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Single File Upload</h3>
        <FileUploadArea
          multiple={false}
          maxFiles={1}
          onFilesSelected={handleFilesSelected}
          onFileRemove={handleFileRemove}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Multi-File Upload</h3>
        <FileUploadArea
          multiple={true}
          maxFiles={5}
          onFilesSelected={handleFilesSelected}
          onFileRemove={handleFileRemove}
        />
      </div>
    </div>
  );
}