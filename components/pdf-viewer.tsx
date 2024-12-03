'use client';

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchLatestPDF = async () => {
      const response = await fetch("/api/latest-pdf");
      const data = await response.json();
      if (data.path) {
        setPdfPath(data.path);
      }
    };

    fetchLatestPDF();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  if (!pdfPath) {
    return <div className="text-center text-gray-600 mt-4">No PDF uploaded yet.</div>;
  }

  if (numPages! > 4) {
    return (
      <div className="border rounded-lg p-4 mt-4 bg-red-100 text-red-800">
        <p className="text-lg font-semibold">
          Only two-page PDFs are supported.<br />
          Subscribe to the premium plan to unlock this feature.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 mt-4 bg-white shadow-md">
      <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
        {/* Render only the current page */}
        <Page 
          key={`page_${pageNumber}`} 
          pageNumber={pageNumber} 
          width={600} // Adjust width as needed
          className="my-4 border-b border-gray-300"
        />
      </Document>
      <div className="flex justify-between mt-4">
      <button 
          onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} 
          disabled={pageNumber <= 1} 
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center ${pageNumber <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="self-center text-gray-700">Page {pageNumber} of {numPages}</span>
        <button 
          onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages!))} 
          disabled={pageNumber >= (numPages || 0)} 
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center ${pageNumber >= (numPages || 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;