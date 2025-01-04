'use client';

import { useState } from 'react';
import PDFUploader from './pdf-uploader';
import PDFViewer from './pdf-viewer';



const PDFUploadAndViewer = () => {
  const [pdfPath, setPdfPath] = useState<string>('');

  const handleUploadSuccess = (path: string) => {
    setPdfPath(path);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 p-4">
      <div className="w-full md:w-1/2">
        <PDFUploader onUploadSuccess={handleUploadSuccess} />
      </div>
      <div className="w-full md:w-1/2">
        <PDFViewer pdfPath={pdfPath} />
      </div>
    </div>
  );
};

export default PDFUploadAndViewer;