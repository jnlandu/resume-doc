'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { summarizePDF } from "@/app/actions";
import { Loader2, Download, Copy, ThumbsUp, ThumbsDown } from "lucide-react"; // Importing icons

const Summary = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const result = await summarizePDF();
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

      {/* Action Buttons */}
      {summary && (
        <CardFooter className="border-t bg-gray-50 p-4 flex justify-center items-center">
          <div className="flex space-x-2">
            <Button onClick={handleCopy} className=" bg-green-500 hover:bg-green-600 text-white">
              <Copy className="mr-2" width={16} height={16} /> 
            </Button>
            <Button onClick={handleDownload} className="flex items-center bg-blue-500 hover:bg-blue-600 text-white">
              <Download className="mr-2" width={16} height={16} /> 
            </Button>
            {/* Placeholder for feedback buttons */}
            <Button className=" bg-yellow-500 hover:bg-yellow-600 text-white">
              <ThumbsUp className="mr-2" width={16} height={16} /> 
            </Button>
            <Button className=" bg-red-500 hover:bg-red-600 text-white">
              <ThumbsDown className="mr-2" width={16} height={16} /> 
            </Button>
          </div>
        </CardFooter>
      )}
      
      {!summary && !loading && (
        <CardFooter className="border-t bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">Summary will appear here after generation</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default Summary;