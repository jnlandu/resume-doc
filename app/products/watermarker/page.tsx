import NavBar from '@/components/NavBar';
import React, { useState } from 'react';

export default function PDFWatermarker() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarked, setWatermarked] = useState(false);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleWatermark = () => {
    if (selectedFile && watermarkText) {
      // Simulated watermarking
      setWatermarked(true);
    }
  };

  return (
    <main className="container mx-auto p-6 bg-gray-50 min-h-screen">
    <NavBar/>

    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">PDF Watermarker</h1>
        
        <div className="mb-6">
          <input 
            type="file" 
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <input 
          type="text"
          placeholder="Enter watermark text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />
        
        <button 
          onClick={handleWatermark}
          disabled={!selectedFile || !watermarkText}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Apply Watermark
        </button>

        {watermarked && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Watermark Applied</h2>
            <p>PDF successfully watermarked with "{watermarkText}"</p>
          </div>
        )}
      </div>
    </div>
    </main>
  );
}