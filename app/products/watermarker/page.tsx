'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Document, 
  Page, 
  pdfjs 
} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileUp, 
  ZoomIn, 
  ZoomOut, 
  Type, 
  AlignCenter, 
  AlignLeft, 
  AlignRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type WatermarkPosition = 'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right';

const PDFWatermarker = () => {
  // File and preview state
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [watermarkedFile, setWatermarkedFile] = useState<File | null>(null);

  // PDF page state
  const [originalNumPages, setOriginalNumPages] = useState<number>(0);
  const [watermarkedNumPages, setWatermarkedNumPages] = useState<number>(0);
  const [originalPageNumber, setOriginalPageNumber] = useState(1);
  const [watermarkedPageNumber, setWatermarkedPageNumber] = useState(1);

  // Zoom state
  const [originalZoom, setOriginalZoom] = useState(1);
  const [watermarkedZoom, setWatermarkedZoom] = useState(1);

  // Watermark configuration
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkPosition, setWatermarkPosition] = useState<WatermarkPosition>('center');
  const [watermarkOpacity, setWatermarkOpacity] = useState(30);
  const [watermarkRotation, setWatermarkRotation] = useState(0);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setOriginalFile(file);
      // Reset states
      setOriginalPageNumber(1);
      setWatermarkedPageNumber(1);
      setOriginalZoom(1);
      setWatermarkedZoom(1);
    }
  };

  // Watermark positioning options
  const watermarkPositions: { value: WatermarkPosition, icon: React.ElementType }[] = [
    { value: 'top-left', icon: AlignLeft },
    { value: 'top-center', icon: AlignCenter },
    { value: 'top-right', icon: AlignRight },
    { value: 'center', icon: AlignCenter },
    { value: 'bottom-left', icon: AlignLeft },
    { value: 'bottom-center', icon: AlignCenter },
    { value: 'bottom-right', icon: AlignRight },
  ];

  // Render PDF page with watermark
  const renderWatermarkedPage = () => {
    if (!originalFile) return null;

    return (
     
      <div className="relative">
        <Document file={originalFile}>
          <Page 
            pageNumber={watermarkedPageNumber}
            width={600 * watermarkedZoom}
          />
        </Document>
        {watermarkText && (
          <div 
            className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center"
            style={{
              opacity: watermarkOpacity / 100,
              transform: `rotate(${watermarkRotation}deg)`,
            }}
          >
            <div 
              className={`text-gray-500 font-bold text-4xl select-none text-center`}
              style={{
                ...(watermarkPosition === 'top-left' && { top: '10%', left: '10%', position: 'absolute' }),
                ...(watermarkPosition === 'top-center' && { top: '10%', left: '50%', transform: 'translateX(-50%)' }),
                ...(watermarkPosition === 'top-right' && { top: '10%', right: '10%', position: 'absolute' }),
                ...(watermarkPosition === 'center' && { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }),
                ...(watermarkPosition === 'bottom-left' && { bottom: '10%', left: '10%', position: 'absolute' }),
                ...(watermarkPosition === 'bottom-center' && { bottom: '10%', left: '50%', transform: 'translateX(-50%)' }),
                ...(watermarkPosition === 'bottom-right' && { bottom: '10%', right: '10%', position: 'absolute' }),
              }}
            >
              {watermarkText}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-2 gap-6">
      {/* Original File Preview */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Original Document</h2>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setOriginalZoom(Math.max(0.5, originalZoom - 0.25))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setOriginalZoom(Math.min(2, originalZoom + 0.25))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* File Upload */}
        {!originalFile ? (
          <div className="border-2 border-dashed border-gray-300 p-8 text-center">
            <input 
              type="file" 
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <label 
              htmlFor="pdf-upload" 
              className="cursor-pointer flex flex-col items-center"
            >
              <FileUp className="h-12 w-12 text-gray-400 mb-4" />
              <span className="text-gray-600">Click to upload PDF</span>
            </label>
          </div>
        ) : (
          <div className="relative">
            <Document 
              file={originalFile}
              onLoadSuccess={({ numPages }) => setOriginalNumPages(numPages)}
            >
              <Page 
                pageNumber={originalPageNumber}
                width={600 * originalZoom}
              />
            </Document>
            
            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline"
                onClick={() => setOriginalPageNumber(Math.max(1, originalPageNumber - 1))}
                disabled={originalPageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>Page {originalPageNumber} of {originalNumPages}</span>
              <Button 
                variant="outline"
                onClick={() => setOriginalPageNumber(Math.min(originalNumPages, originalPageNumber + 1))}
                disabled={originalPageNumber >= originalNumPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Watermark Configuration and Preview */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Watermark Configuration</h2>
        
        {/* Watermark Text Input */}
        <div className="mb-4">
          <Label>Watermark Text</Label>
          <Input 
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            placeholder="Enter watermark text"
          />
        </div>

        {/* Watermark Position */}
        <div className="mb-4">
          <Label>Watermark Position</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {watermarkPositions.map(({ value, icon: Icon }) => (
              <Button
                key={value}
                variant={watermarkPosition === value ? 'default' : 'outline'}
                onClick={() => setWatermarkPosition(value)}
                className="flex items-center justify-center"
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        {/* Opacity Slider */}
        <div className="mb-4">
          <Label>Opacity</Label>
          <Slider
            value={[watermarkOpacity]}
            onValueChange={(value: any) => setWatermarkOpacity(value[0])}
            max={100}
            step={1}
          />
        </div>

        {/* Rotation Slider */}
        <div className="mb-4">
          <Label>Rotation</Label>
          <Slider
            value={[watermarkRotation]}
            onValueChange={(value: any) => setWatermarkRotation(value[0])}
            min={-180}
            max={180}
            step={1}
          />
        </div>

        {/* Watermarked Preview */}
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Watermarked Preview</h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setWatermarkedZoom(Math.max(0.5, watermarkedZoom - 0.25))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setWatermarkedZoom(Math.min(2, watermarkedZoom + 0.25))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {originalFile ? renderWatermarkedPage() : (
            <div className="border-2 border-dashed border-gray-300 p-8 text-center text-gray-600">
              Upload a PDF to see watermark preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFWatermarker;