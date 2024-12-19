'use client';

import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  RefreshCw, 
  AlertCircle, 
  Info, 
  FileText, 
  Wand2, 
  Type, 
  HelpCircle,
  BookOpen,
  Target,
  Zap,
  Globe,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import NavBar from '@/components/NavBar';
// Import the new components
import PlagiarismDetector from '@/components/plagiarism';
import ReadabilityAnalysis from '@/components/readability-analysis';
import CitationGenerator from '@/components/citationGenerator';
import ParaphraserFeatures from '@/lib/paraphrase-features';

const Paraphraser = () => {
  const MAX_WORDS = 250; // Maximum number of words allowed
  const [inputText, setInputText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');
  const [error, setError] = useState('');
  const [activeMode, setActiveMode] = useState('standard');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [activeTab, setActiveTab] = useState('paraphrase');

  // Language options
  const LANGUAGES = [
    { code: 'english', name: 'English' },
    { code: 'spanish', name: 'Spanish' },
    { code: 'french', name: 'French' },
    { code: 'german', name: 'German' },
    { code: 'portuguese', name: 'Portuguese' }
  ];

  const wordCount = useMemo(() => {
    return inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
  }, [inputText]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    
    const words = text.trim().split(/\s+/).filter((word: string) => word.length > 0);
    if (words.length <= MAX_WORDS) {
      setInputText(text);
      setError('');
    } else {
      setError(`Maximum ${MAX_WORDS} words allowed`);
    }
  };

  const handleParaphrase = () => {
    // Placeholder for paraphrasing logic
    // In a real implementation, this would call an API with mode and language
    const mockParaphrasedText = `Paraphrased text in ${selectedLanguage} (${activeMode} mode)`;
    setParaphrasedText(mockParaphrasedText);
  };

  const handleCopyText = () => {
    if (paraphrasedText) {
      navigator.clipboard.writeText(paraphrasedText);
    }
  };

  return (

    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-600 text-center">
              <Wand2 className="inline-block mr-3 text-blue-500" size={36} />
              Advanced Paraphraser
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Transform your writing with intelligent paraphrasing
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Global Tabs for Different Functionalities */}
            <Tabs 
              defaultValue="paraphrase" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="paraphrase">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Paraphrase
                </TabsTrigger>
                <TabsTrigger value="citation">
                  <FileText className="mr-2 h-4 w-4" />
                  Citation
                </TabsTrigger>
                <TabsTrigger value="analysis">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Analysis
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Paraphrase Tab Content */}
            {activeTab === 'paraphrase' && (
              <>
                {/* Mode Selection */}
                <div className="flex space-x-4 mb-6">
                  {/* Mode Selection Tabs */}
                  <div className="flex-grow">
                    <Tabs 
                      defaultValue="standard" 
                      onValueChange={setActiveMode}
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="standard">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Standard
                        </TabsTrigger>
                        <TabsTrigger value="creative">
                          <Zap className="mr-2 h-4 w-4" />
                          Creative
                        </TabsTrigger>
                        <TabsTrigger value="concise">
                          <Target className="mr-2 h-4 w-4" />
                          Concise
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Language Selection */}
                  <div className="w-1/3">
                    <Select 
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger>
                        <div className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select Language" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map(lang => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Word Count and Error Handling */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Type className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      Words: {wordCount} / {MAX_WORDS}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Maximum 250 words for paraphrasing</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {/* Input Textarea */}
                <Textarea 
                  placeholder="Enter text to paraphrase (max 250 words)"
                  value={inputText}
                  onChange={handleInputChange}
                  className="mb-4 min-h-[200px]"
                />
                
                {/* Paraphrase Button */}
                <div className="flex space-x-4 mb-4">
                  <Button 
                    onClick={handleParaphrase}
                    className="flex-1"
                    disabled={wordCount === 0 || wordCount > MAX_WORDS}
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
                        <CardTitle className="text-xl flex items-center justify-between">
                          <div>
                            Paraphrased Text
                            <span className="text-sm text-gray-500 ml-2">
                              ({activeMode} mode)
                            </span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleCopyText}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{paraphrasedText}</p>
                      </CardContent>
                      <CardFooter className="text-xs text-gray-500 italic">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Paraphrased with ResumDoc AI
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </>
            )}

            {/* Citation Tab Content */}
            {activeTab === 'citation' && (
              <CitationGenerator />
            )}

            {/* Analysis Tab Content */}
            {activeTab === 'analysis' && inputText && (
              <div className="space-y-4">
                <PlagiarismDetector text={inputText} />
                <ReadabilityAnalysis text={inputText} />
              </div>
            )}
          </CardContent>
        </Card>
        {/* New Features Section */}
        <ParaphraserFeatures />
      </div>
      
    </div>
  );
}

export default Paraphraser;