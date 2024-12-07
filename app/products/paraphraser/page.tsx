'use client';

import React, { useState } from 'react';
import { Copy, RefreshCw, AlertCircle, Info, FileText, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NavBar from '@/components/NavBar';

const Paraphraser = () => {
  const [inputText, setInputText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');
  const [error, setError] = useState('');
  const [activeMode, setActiveMode] = useState('standard');

  const handleParaphrase = () => {
    setError('');
    
    if (!inputText.trim()) {
      setError('Please enter some text to paraphrase.');
      return;
    }

    // Enhanced paraphrasing logic with different modes
    let paraphrased;
    switch(activeMode) {
      case 'standard':
        paraphrased = inputText.split(' ').map(word => 
          word.length > 3 ? word.split('').reverse().join('') : word
        ).join(' ');
        break;
      case 'creative':
        paraphrased = inputText.replace(/\b\w{3,}\b/g, (match) => {
          const synonyms = {
            'good': 'excellent',
            'happy': 'delighted',
            'big': 'substantial',
            'small': 'diminutive'
          };
          return synonyms[match.toLowerCase()] || match;
        });
        break;
      case 'concise':
        paraphrased = inputText.split(/[.!?]/)
          .map(sentence => sentence.trim())
          .filter(sentence => sentence.length > 0)
          .map(sentence => {
            const words = sentence.split(' ');
            return words.length > 5 
              ? words.slice(0, 5).join(' ') + '...' 
              : sentence;
          })
          .join('. ');
        break;
      default:
        paraphrased = inputText;
    }
    
    setParaphrasedText(paraphrased);
  };

  const handleCopyText = () => {
    if (paraphrasedText) {
      navigator.clipboard.writeText(paraphrasedText);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-600 text-center">
              <Wand2 className="inline-block mr-3 text-blue-500" size={36} />
              Advanced Paraphraser
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Rest of the component remains the same */}
            <Tabs 
              defaultValue="standard" 
              onValueChange={setActiveMode}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="standard">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Standard
                </TabsTrigger>
                <TabsTrigger value="creative">
                  <FileText className="mr-2 h-4 w-4" />
                  Creative
                </TabsTrigger>
                <TabsTrigger value="concise">
                  <FileText className="mr-2 h-4 w-4" />
                  Concise
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Information Alert */}
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Paraphrasing Modes</AlertTitle>
              <AlertDescription>
                Choose a paraphrasing mode: Standard (basic transformation), 
                Creative (synonym replacement), or Concise (text summarization).
              </AlertDescription>
            </Alert>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Input Textarea */}
            <Textarea 
              placeholder="Enter text to paraphrase"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="mb-4 min-h-[200px]"
            />
            
            {/* Paraphrase Button */}
            <div className="flex space-x-4 mb-4">
              <Button 
                onClick={handleParaphrase}
                className="flex-1"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Paraphrase ({activeMode} mode)
              </Button>
            </div>

            {/* Paraphrased Text Result */}
            {paraphrasedText && (
              <div className="relative">
                <Card className="bg-gray-100">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Paraphrased Text
                      <span className="text-sm text-gray-500 ml-2">
                        ({activeMode} mode)
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{paraphrasedText}</p>
                  </CardContent>
                </Card>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute top-2 right-2"
                  onClick={handleCopyText}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Paraphraser;