'use client';

import NavBar from '@/components/NavBar';
import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function OCR() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [extractedText, setExtractedText] = useState('');
  const [formatOptions, setFormatOptions] = useState('Plain Text');
  const [scale, setScale] = useState(1);
  const fileInputRef = useRef(null);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: any) => {
    setSelectedFile(file);
    setPageNumber(1);
    setScale(1);
  };

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  const changePage = (offset: any) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const handleZoom = (zoomType: any) => {
    setScale(prevScale => 
      zoomType === 'in' ? Math.min(prevScale * 1.25, 3) : 
      Math.max(prevScale / 1.25, 0.5)
    );
  };

  const handleExtractText = (e: any) => {
    e.preventDefault();
    if (selectedFile) {
      setExtractedText(`Extracted text from ${selectedFile.name}. (Simulated OCR result in ${formatOptions})`);
    }
  };

  const handleUploadClick = (e: any) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handlePageChange = (type: any) => (e: any) => {
    e.preventDefault();
    if (type === 'prev' && pageNumber > 1) {
      changePage(-1);
    } else if (type === 'next' && pageNumber < numPages!) {
      changePage(1);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <NavBar/>
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">PDF OCR & Viewer</h1>
        <p className="text-xl mb-6">
          Convert images and scanned PDFs to text, Markdown, JSON, or XML.
        </p>
      </div>

      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - File Upload/Drop Zone */}
          <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleUploadClick}
              className="border-2 border-dashed border-blue-300 rounded-lg p-10 text-center cursor-pointer hover:bg-blue-50 transition"
            >
              <p className="text-gray-500">
                Drag and drop file here or click to upload
              </p>
            </div>

            {/* Upload Button */}
            <div className="flex justify-center mt-4">
              <button 
                onClick={handleUploadClick}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Upload Document
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*,.pdf"
                className="hidden"
              />
            </div>
            

            {/* Uploaded File Display */}
            {selectedFile && (
              <div className="mt-4">
                <div className="p-4 bg-gray-100 rounded-lg flex items-center mb-4">
                  <span className="mr-4">📄</span>
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>

                {/* PDF Viewer */}
                {selectedFile.type === 'application/pdf' && (
                  <div className="bg-gray-100 rounded-lg p-4">
                    {/* Zoom Controls */}
                    <div className="flex justify-center mb-4 space-x-4">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          handleZoom('out');
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        -
                      </button>
                      <span className="self-center">Zoom: {Math.round(scale * 100)}%</span>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          handleZoom('in');
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        +
                      </button>
                    </div>

                    <Document
                      file={URL.createObjectURL(selectedFile)}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="flex justify-center"
                    >
                      <Page 
                        pageNumber={pageNumber} 
                        scale={scale}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </Document>
                    
                    {/* Pagination */}
                    {numPages > 1 && (
                      <div className="flex justify-center items-center mt-4 space-x-4">
                        <button 
                          onClick={handlePageChange('prev')}
                          disabled={pageNumber <= 1}
                          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <span>Page {pageNumber} of {numPages}</span>
                        <button 
                          onClick={handlePageChange('next')}
                          disabled={pageNumber >= numPages}
                          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Text Extraction Options */}
          <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Extract Text</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Output Format</label>
              <select 
                value={formatOptions}
                onChange={(e) => setFormatOptions(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option>Plain Text</option>
                <option>JSON</option>
                <option>XML</option>
                <option>Markdown</option>
              </select>
            </div>
            
            <button 
              onClick={handleExtractText}
              disabled={!selectedFile}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              Extract Text
            </button>

            {extractedText && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Extracted Text</h3>
                <pre className="whitespace-pre-wrap break-words">{extractedText}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}