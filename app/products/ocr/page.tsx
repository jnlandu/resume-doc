'use client';

import NavBar from '@/components/NavBar';
import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import Tesseract from 'tesseract.js';
import { getDocument } from 'pdfjs-dist/build/pdf';
import { Loader2 } from 'lucide-react'; // Assuming lucide-react is available for spinner

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function OCR() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [formatOptions, setFormatOptions] = useState('Plain Text');
  const [isLoading, setIsLoading] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(1);
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
    setPreviewZoom(1); // Reset zoom when new file is selected
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const pdfToImage = async (file) => {
    const pdfData = await file.arrayBuffer();
    const pdfDoc = await getDocument({ data: pdfData }).promise;
    const numPages = pdfDoc.numPages;
    const images = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');

      await page.render({ canvasContext: context, viewport }).promise;
      images.push(canvas.toDataURL());
    }

    return images;
  };

  const handleExtractText = async () => {
    if (selectedFile) {
      setIsLoading(true);
      try {
        if (selectedFile.type === 'application/pdf') {
          const images = await pdfToImage(selectedFile);
          let fullText = '';

          for (const img of images) {
            const { data: { text } } = await Tesseract.recognize(img, 'eng', {
              logger: info => console.log(info),
            });
            fullText += text + '\n';
          }

          setExtractedText(fullText);
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            Tesseract.recognize(
              reader.result,
              'eng',
              {
                logger: info => console.log(info),
              }
            ).then(({ data: { text } }) => {
              setExtractedText(text);
              setIsLoading(false);
            }).catch(err => {
              console.error(err);
              setExtractedText('Error extracting text');
              setIsLoading(false);
            });
          };
          reader.readAsDataURL(selectedFile);
        }
      } catch (error) {
        console.error(error);
        setExtractedText('Error extracting text');
        setIsLoading(false);
      }
    }
  };

  const handleZoomIn = () => {
    setPreviewZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setPreviewZoom(prev => Math.max(prev - 0.2, 0.4));
  };

  return (
    <main className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <NavBar/>
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 text-center mb-6">
        <h1 className="text-4xl font-bold mb-4">OCR Document Extractor</h1>
        <p className="text-xl">Upload images or PDFs and extract text instantly</p>
      </div>

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
                Drag and drop files here or click to upload
              </p>
              <p className="text-sm text-gray-400 mt-2">Supported formats: JPG, PNG, PDF</p>
            </div>

            {/* Zoom Controls */}
            {selectedFile && (
              <div className="flex justify-center mt-4 space-x-4">
                <button 
                  onClick={handleZoomOut} 
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="self-center">Zoom: {Math.round(previewZoom * 100)}%</span>
                <button 
                  onClick={handleZoomIn} 
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            )}

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

            {/* File Preview with Zoom */}
            {selectedFile && selectedFile.type.startsWith('image/') && (
              <img 
                src={URL.createObjectURL(selectedFile)} 
                alt="Preview" 
                style={{ transform: `scale(${previewZoom})`, transition: 'transform 0.3s' }}
                className="mt-4 rounded-lg max-w-full h-auto origin-top-left"
              />
            )}
            {selectedFile && selectedFile.type === 'application/pdf' && (
              <iframe 
                src={URL.createObjectURL(selectedFile)} 
                title="PDF Preview" 
                style={{ transform: `scale(${previewZoom})`, transition: 'transform 0.3s' }}
                className="mt-4 w-full h-64 border rounded-lg origin-top-left"
              />
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
              disabled={!selectedFile || isLoading}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Extracting...
                </>
              ) : (
                'Extract Text'
              )}
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