'use client';

import NavBar from '@/components/NavBar';
import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import Tesseract from 'tesseract.js';
import { getDocument } from 'pdfjs-dist/build/pdf';
import { Loader2, ChevronLeft, ChevronRight, UploadCloud } from 'lucide-react';
import { marked } from 'marked';
import { Groq } from 'groq-sdk';

import { ocr } from 'llama-ocr'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;






export default function OCR() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  // const [formatOptions, setFormatOptions] = useState('Plain Text');
  const [isLoading, setIsLoading] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(1);
  const fileInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfPages, setPdfPages] = useState([]);
  const [formatOptions, setFormatOptions] = useState('Markdown'); // Default to Markdown


  //  Initialize Groq
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
 

  const handleFileSelect = async (file: any) => {
    setSelectedFile(file);
    setPreviewZoom(1);
    setCurrentPage(1);

    if (file.type === 'application/pdf') {
      try {
        const pdfData = await file.arrayBuffer();
        const pdfDoc = await getDocument({ data: pdfData }).promise;
        const numPages = pdfDoc.numPages;
        setTotalPages(numPages);

        const pageImages = [];
        for (let i = 1; i <= numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');

          await page.render({ canvasContext: context, viewport }).promise;
          pageImages.push(canvas.toDataURL());
        }
        setPdfPages(pageImages);
      } catch (error) {
        console.error('Error processing PDF:', error);
      }
    } else {
      setTotalPages(1);
      setPdfPages([]);
    }
  };

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const pdfToImage = async (file: any) => {
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };


const formatExtractedText = (text: string) => {
    switch(formatOptions) {
      case 'Markdown':
        // Convert text to markdown
        return marked.parse(text);
      case 'Plain Text':
        // Return raw text
        return text;
      case 'JSON':
        // Convert text to JSON and return it 
        return JSON.stringify({ extractedText: text }, null, 2);
      case 'XML':
        // Convert text to XML and return it
        return `<?xml version="1.0" encoding="UTF-8"?>
<extracted-text>${text}</extracted-text>`;
      default:
        return text;
    }
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
              className="border-2 border-dashed border-blue-400 rounded-xl p-10 text-center cursor-pointer 
                         hover:bg-blue-50 transition duration-300 ease-in-out 
                         flex flex-col items-center justify-center 
                         group"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*,.pdf"
                className="hidden"
              />
              <UploadCloud 
                className="text-blue-400 group-hover:text-blue-600 
                           w-16 h-16 mb-4 transition duration-300"
              />
              <p className="text-gray-600 font-medium group-hover:text-blue-700 transition duration-300">
                Drag and drop files here or click to upload
              </p>
              <p className="text-sm text-gray-400 mt-2">Supported formats: JPG, PNG, PDF</p>
            </div>

            {/* Zoom Controls */}
            {selectedFile && (
              <div className="flex justify-center mt-4 space-x-4">
                <button 
                  onClick={handleZoomOut} 
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition"
                >
                  -
                </button>
                <span className="self-center">Zoom: {Math.round(previewZoom * 100)}%</span>
                <button 
                  onClick={handleZoomIn} 
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition"
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

            {/* File Preview with Zoom and Pagination */}
            {selectedFile && (
              <div className="mt-4 relative">
                {selectedFile.type.startsWith('image/') && (
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Preview" 
                    style={{ transform: `scale(${previewZoom})`, transition: 'transform 0.3s' }}
                    className="rounded-lg max-w-full h-auto origin-top-left"
                  />
                )}

                {selectedFile.type === 'application/pdf' && pdfPages.length > 0 && (
                  <div>
                    <img 
                      src={pdfPages[currentPage - 1]} 
                      alt={`PDF Page ${currentPage}`}
                      style={{ transform: `scale(${previewZoom})`, transition: 'transform 0.3s' }}
                      className="rounded-lg max-w-full h-auto origin-top-left"
                    />
                    
                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-4 space-x-4">
                      <button 
                        onClick={handlePreviousPage} 
                        disabled={currentPage === 1}
                        className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition disabled:opacity-50"
                      >
                        <ChevronLeft />
                      </button>
                      <span>Page {currentPage} of {totalPages}</span>
                      <button 
                        onClick={handleNextPage} 
                        disabled={currentPage === totalPages}
                        className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition disabled:opacity-50"
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Text Extraction Options (remains the same) */}
          {/* ... */}
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

            {/* {extractedText && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg max-h-[400px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2 sticky top-0 bg-gray-100">Extracted Text</h3>
                <pre className="whitespace-pre-wrap break-words">{extractedText}</pre>
              </div>
            )} */}
            {extractedText && (
               <div className="mt-6 p-4 bg-gray-100 rounded-lg max-h-[400px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2">Extracted Text</h3>
                {formatOptions === 'Markdown' ? (
                  <div 
                    className="prose max-w-full" 
                    dangerouslySetInnerHTML={{ 
                      __html: formatExtractedText(extractedText) 
                    }} 
                  />
                ) : (
                  <pre className="whitespace-pre-wrap break-words">
                    {formatExtractedText(extractedText)}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}