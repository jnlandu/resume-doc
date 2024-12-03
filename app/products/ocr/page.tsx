'use client';

import NavBar from '@/components/NavBar';
import React, { useState, useRef } from 'react';

export default function OCR() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [formatOptions, setFormatOptions] = useState('Plain Text');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleExtractText = () => {
    if (selectedFile) {
      // Placeholder text extraction
      setExtractedText(`Extracted text from ${selectedFile.name}. (Simulated OCR result in ${formatOptions})`);
    }
  };

  return (
    <main className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <NavBar/>
      <div className="container mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - File Upload/Drop Zone */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Upload Document</h2>
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-blue-300 rounded-lg p-10 text-center cursor-pointer hover:bg-blue-50 transition"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*,.pdf"
                className="hidden"
              />
              <p className="text-gray-500">
                Drag and drop file here or click to upload
              </p>
            </div>

            {/* Uploaded File Display */}
            {selectedFile && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg flex items-center">
                <span className="mr-4">📄</span>
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Text Extraction Options */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Text Extraction</h2>
            
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
    </main>
  );
}