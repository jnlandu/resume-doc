'use client';

import NavBar from '@/components/NavBar';
import React, { useState } from 'react';

export default function Paraphraser() {
  const [inputText, setInputText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');

  const handleParaphrase = () => {
    // Simple paraphrasing logic (placeholder)
    if (inputText.trim()) {
      const words = inputText.split(' ');
      const paraphrased = words.map(word => 
        word.length > 3 ? word.split('').reverse().join('') : word
      ).join(' ');
      setParaphrasedText(paraphrased);
    }
  };

  return (
    <main className="container mx-auto p-6 bg-gray-50 min-h-screen">
    <NavBar/>

    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Paraphraser</h1>
        
        <textarea 
          className="w-full h-48 p-4 border rounded-lg mb-4"
          placeholder="Enter text to paraphrase"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <button 
          onClick={handleParaphrase}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Paraphrase
        </button>

        {paraphrasedText && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Paraphrased Text</h2>
            <p>{paraphrasedText}</p>
          </div>
        )}
      </div>
    </div>
    </main>
  );
}