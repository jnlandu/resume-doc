'use client';

// import NavBar from '@/components/NavBar';
import React, { useState } from 'react';

export default function CitationGenerator() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [citation, setCitation] = useState('');

  const handleGenerateCitation = () => {
    if (title && author && year) {
      // Basic APA citation format
      const generatedCitation = `${author}. (${year}). ${title}.`;
      setCitation(generatedCitation);
    }
  };

  return (
    <main className="container mx-auto p-6 bg-gray-50 min-h-screen">
    {/* <NavBar/> */}
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Citation Generator</h1>
        
        <div className="space-y-4 mb-6">
          <input 
            className="w-full p-2 border rounded-lg"
            placeholder="Title of Work"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            className="w-full p-2 border rounded-lg"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input 
            className="w-full p-2 border rounded-lg"
            placeholder="Year of Publication"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        
        <button 
          onClick={handleGenerateCitation}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Generate Citation
        </button>

        {citation && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Generated Citation</h2>
            <p>{citation}</p>
          </div>
        )}
      </div>
    </div>
    </main>
  );
}