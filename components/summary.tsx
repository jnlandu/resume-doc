'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { summarizePDF } from "@/app/actions";
import { Loader2, Download, Copy, ThumbsUp, ThumbsDown } from "lucide-react"; // Importing icons

const Summary = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState<number>(100); // Default word count

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const result = await summarizePDF(); // DO this later: Pass word count to the function
      setSummary(result!.summary);
    } catch (error) {
      console.error("Failed to generate summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      alert("Summary copied to clipboard!");
    }
  };

  const handleDownload = () => {
    if (summary) {
      const blob = new Blob([summary], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'summary.txt';
      link.click();
    }
  };

  const handleRestart = () => {
    setSummary(null); // Reset the summary
    setWordCount(100); // Reset the word count to default
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
        <CardTitle className="text-2xl font-bold text-blue-800 flex items-center justify-between">
          PDF Summary
          {summary && (
            <span className="text-sm text-blue-600 font-normal">
              {new Date().toLocaleDateString()}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-6" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {loading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="text-gray-600">Generating summary...</p>
          </div>
        ) : summary ? (
          <div className="space-y-4">
            <p className="text-base text-gray-800 text-justify leading-relaxed">{summary}</p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-600 mb-4">
              Click the button below to generate a summary of your PDF document.
            </p>
            <Button 
              onClick={handleSummarize} 
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Generate Summary
            </Button>
          </div>
        )}
      </CardContent>

      {/* Word Count Input */}
      <CardFooter className="border-t bg-gray-50 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <label htmlFor="wordCount" className="text-gray-700">Word Count:</label>
          <input
            type="number"
            id="wordCount"
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
            min={1}
            className="border rounded-md p-1 w-[60px] text-center"
          />
        </div>

        {/* Action Buttons */}
        {summary && (
          <div className="flex space-x-2">
            {/* Copy Button */}
            <div className="relative group">
              <Button onClick={handleCopy} className="bg-green-500 hover:bg-green-600 text-white text-sm px-2 py-1 rounded-md">
                <Copy className="mr-1 h-4 w-4" /> 
              </Button>
              <span className="absolute left-[50%] transform -translate-x-[50%] bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">Copy Summary</span>
            </div>

            {/* Download Button */}
            <div className="relative group">
              <Button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded-md">
                <Download className="mr-1 h-4 w-4" /> 
              </Button>
              <span className="absolute left-[50%] transform -translate-x-[50%] bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">Download</span>
            </div>

            {/* Feedback Buttons */}
            <div className="relative group">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-2 py-1 rounded-md">
                <ThumbsUp className="mr-1 h-4 w-4" /> 
              </Button>
              <span className="absolute left-[50%] transform -translate-x-[50%] bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">Like</span>
            </div>

            <div className="relative group">
              <Button className="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded-md">
                <ThumbsDown className="mr-1 h-4 w-4" /> 
              </Button>
              <span className="absolute left-[50%] transform -translate-x-[50%] bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">Dislike</span>
            </div>

            {/* Restart Button */}
            <div className="relative group">
              <Button onClick={handleRestart} className="bg-gray-500 hover:bg-gray600 text-white text-sm px -2 py -1 rounded-md">
                Restart
              </Button>
              <span className="absolute left-[50%] transform -translate-x-[50%] bottom-full mb -1 hidden group-hover:block bg-gray -800 text-white text-xs rounded px -2 py -1">Restart Summary</span>
            </div>
          </div>
        )}
      </CardFooter>
      {!summary && !loading && (
        <CardFooter className="border-t bg-gray -50 p -4 text-center">
          <p className="text-sm text-gray -500 mt-2">Summary will appear here after generation</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default Summary;