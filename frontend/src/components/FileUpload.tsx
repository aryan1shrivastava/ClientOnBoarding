import { useState, useRef } from 'react';
import '../styles/global.css';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  uploadedFiles?: Array<{ id: string; originalName: string; fileName: string }>;
}

const FileUpload = ({ onFilesSelected, uploadedFiles = [] }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
    }
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? '#6A38F5' : '#E8DEFF'}`,
          borderRadius: '12px',
          padding: '48px',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging ? '#F5F5F7' : 'white',
          transition: 'all 0.3s ease',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
        <div style={{ color: '#6A38F5', fontSize: '2rem', marginBottom: '16px' }}>📁</div>
        <p style={{ color: '#666666', marginBottom: '8px' }}>
          Drag and drop files here, or click to select
        </p>
        <p style={{ color: '#999999', fontSize: '0.875rem' }}>
          Supports all file types (max 50MB per file)
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h4 style={{ marginBottom: '16px', fontSize: '1rem' }}>Uploaded Files:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                style={{
                  padding: '12px',
                  background: '#F5F5F7',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#1A1A1A' }}>{file.originalName}</span>
                <span style={{ color: '#10B981', fontSize: '0.875rem' }}>✓ Uploaded</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

