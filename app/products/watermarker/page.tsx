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
  FileUp, 
  Download, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Type, 
  ImageIcon, 
  Settings, 
  TextCursor,
  Palette,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Upload
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface WatermarkPreviewProps {
  type: 'text' | 'image';
  text?: string;
  imageUrl?: string;
  color?: string;
  opacity: number;
  fontSize?: number;
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const WatermarkPreview = ({ 
  type,
  text, 
  imageUrl,
  color, 
  opacity, 
  fontSize, 
  position 
}: WatermarkPreviewProps) => {
  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4'
  };

  if (type === 'text' && text) {
    return (
      <div 
        className={`absolute ${positionStyles[position]} pointer-events-none`}
        style={{
          color,
          opacity: opacity / 100,
          fontSize: `${fontSize}px`,
          transform: position.includes('center') ? 'translateX(-50%)' : undefined,
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          fontWeight: 'bold',
          userSelect: 'none'
        }}
      >
        {text}
      </div>
    );
  }

  if (type === 'image' && imageUrl) {
    return (
      <div 
        className={`absolute ${positionStyles[position]} pointer-events-none`}
        style={{
          opacity: opacity / 100,
          transform: position.includes('center') ? 'translateX(-50%)' : undefined,
        }}
      >
        <img 
          src={imageUrl} 
          alt="Watermark" 
          className="max-w-[200px] max-h-[200px] object-contain"
        />
      </div>
    );
  }

  return null;
};

const AdvancedWatermarker = () => {
  // File and PDF state
  const [file, setFile] = useState<File | null>(null);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);

  // Watermark configuration state
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [watermarkText, setWatermarkText] = useState('Confidential');
  const [watermarkColor, setWatermarkColor] = useState('#000000');
  const [watermarkOpacity, setWatermarkOpacity] = useState(20);
  const [watermarkFontSize, setWatermarkFontSize] = useState(48);
  const [watermarkPosition, setWatermarkPosition] = useState<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>('top-center');
  
  // Image watermark state
  const [watermarkImage, setWatermarkImage] = useState<{
    file: File | null;
    previewUrl: string | null;
  }>({
    file: null,
    previewUrl: null
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setPdfPath(URL.createObjectURL(uploadedFile));
      setPageNumber(1);
    }
  };

  const handleWatermarkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setWatermarkImage({
        file: uploadedFile,
        previewUrl: URL.createObjectURL(uploadedFile)
      });
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const positionOptions = [
    { value: 'top-left', icon: <AlignLeft /> },
    { value: 'top-center', icon: <AlignCenter/> },
    { value: 'top-right', icon: <AlignRight /> },
    { value: 'bottom-left', icon: <AlignLeft /> },
    { value: 'bottom-center', icon: <AlignCenter/> },
    { value: 'bottom-right', icon: <AlignRight /> }
  ];

  return (
   <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
    <NavBar/>
    <Hero/>
    <div className="container mx-auto max-w-6xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* PDF Preview Section */}
      <Card className="w-full bg-white shadow-lg border-0">
        <CardHeader className="border-b bg-gray-50/50 rounded-t-lg">
          <CardTitle className="flex items-center">
          <FileUp className="mr-2 h-5 w-5 text-primary" /> PDF Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="relative p-6">
          {pdfPath ? (
            <div className="relative">
              <Document 
                file={pdfPath} 
                onLoadSuccess={handleDocumentLoadSuccess}
                className="relative"
              >
                <Page 
                  pageNumber={pageNumber} 
                  width={500}
                  className="border shadow-xl rounded-lg overflow-hidden bg-white"
                />
                {watermarkType === 'text' && watermarkText && (
                  <WatermarkPreview 
                    type="text"
                    text={watermarkText}
                    color={watermarkColor}
                    opacity={watermarkOpacity}
                    fontSize={watermarkFontSize}
                    position={watermarkPosition}
                  />
                )}
                {watermarkType === 'image' && watermarkImage.previewUrl && (
                  <WatermarkPreview 
                    type="image"
                    imageUrl={watermarkImage.previewUrl}
                    opacity={watermarkOpacity}
                    position={watermarkPosition}
                  />
                )}
              </Document>
              {/* Page Navigation */}
              <div className="flex justify-between mt-6 items-center">
                <Button 
                  variant="outline"
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber <= 1}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />Previous
                </Button>
                <span className="self-center font-medium text-gray-700">
                  Page {pageNumber} of {numPages}
                </span>
                <Button 
                  variant="outline"
                  onClick={() => setPageNumber(Math.min(numPages || 1, pageNumber + 1))}
                  disabled={pageNumber >= (numPages || 1)}
                  className="hover:bg-gray-100 transition-colors"
                >
                  Next <ChevronRight className="ml-2"/>
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-lg">
              <Input 
                type="file" 
                accept=".pdf"
                onChange={handleFileUpload}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Watermark Configuration Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2" /> Watermark Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Watermark Type Selector */}
          <div>
            <Label>Watermark Type</Label>
            <RadioGroup 
              value={watermarkType}
              onValueChange={(value: 'text' | 'image') => {
                setWatermarkType(value);
                // Reset related state when switching
                if (value === 'text') {
                  setWatermarkImage({ file: null, previewUrl: null });
                } else {
                  setWatermarkText('');
                }
              }}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text-watermark" />
                <Label htmlFor="text-watermark" className="flex items-center">
                  <Type className="mr-2" /> Text
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="image-watermark" />
                <Label htmlFor="image-watermark" className="flex items-center">
                  <ImageIcon className="mr-2" /> Image
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Conditional Rendering based on Watermark Type */}
          {watermarkType === 'text' ? (
            <>
              {/* Text Watermark Configurations */}
              <div>
                <Label>Watermark Text</Label>
                <Input 
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark text"
                />
              </div>

              {/* Color Picker */}
              <div>
                <Label>Watermark Color</Label>
                <div className="flex items-center space-x-4">
                  <Input 
                    type="color" 
                    value={watermarkColor}
                    onChange={(e) => setWatermarkColor(e.target.value)}
                    className="w-16 h-10 p-0 border-none"
                  />
                  <span>{watermarkColor}</span>
                </div>
              </div>

              {/* Font Size */}
              <div>
                <Label>Font Size</Label>
                <Slider
                  value={[watermarkFontSize]}
                  onValueChange={(value) => setWatermarkFontSize(value[0])}
                  min={12}
                  max={120}
                  step={1}
                />
                <div className="text-sm text-gray-500 mt-2">
                  {watermarkFontSize} px
                </div>
              </div>
            </>
          ) : (
            /* Image Watermark Configurations */
            <div>
              <Label>Upload Watermark Image</Label>
              <div className="flex items-center space-x-4">
                <Input 
                  type="file" 
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleWatermarkImageUpload}
                  className="flex-grow"
                />
                {watermarkImage.previewUrl && (
                  <img 
                    src={watermarkImage.previewUrl} 
                    alt="Watermark Preview" 
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
              {watermarkImage.file && (
                <p className="text-sm text-gray-500 mt-2">
                  {watermarkImage.file.name}
                </p>
              )}
            </div>
          )}

          {/* Common Configurations */}
          {/* Opacity Slider */}
          <div>
            <Label>Opacity</Label>
            <Slider
              value={[watermarkOpacity]}
              onValueChange={(value: any) => setWatermarkOpacity(value[0])}
              max={100}
              step={1}
            />
            <div className="text-sm text-gray-500 mt-2">
              {watermarkOpacity}%
            </div>
          </div>

          {/* Position Selector */}
          <div className='flex space-x-8'>
            <Label>Watermark Position</Label>
            <RadioGroup 
              value={watermarkPosition}
              onValueChange={(value: typeof watermarkPosition) => setWatermarkPosition(value)}
              className="grid grid-cols-3 gap-2"
            >
              {positionOptions.map((option: any) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex items-center cursor-pointer"
                  >
                    {option.icon}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t">
            <Button className="flex-grow bg-primary hover:bg-primary/90 text-white">
              Apply
            </Button>
            <Button variant="outline" className="flex-grow hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="outline" className="flex-grow hover:bg-gray-50">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
</div>
  );
};

export default AdvancedWatermarker;