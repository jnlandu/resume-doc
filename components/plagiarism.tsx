import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Check, 
  Info, 
  Link2 
} from 'lucide-react';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

// Mock plagiarism detection function
const checkPlagiarism = async (text: string) => {
  // In a real implementation, this would call an external API
  // Simulating different plagiarism scenarios
  const mockResults = {
    originalityScore: Math.random() * 100, // 0-100 score
    potentialMatches: [
      {
        source: 'Wikipedia: Artificial Intelligence',
        similarity: Math.random() * 30,
        url: 'https://en.wikipedia.org/wiki/Artificial_intelligence'
      },
      {
        source: 'Academic Paper: Machine Learning',
        similarity: Math.random() * 20,
        url: 'https://example.com/academic-paper'
      }
    ]
  };

  return mockResults;
};

const PlagiarismDetector = ({ text }: { text: string }) => {
  const [plagiarismData, setPlagiarismData] = useState<{ originalityScore: number; potentialMatches: { source: string; similarity: number; url: string }[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const detectPlagiarism = async () => {
      if (text.trim().length > 50) {
        setIsLoading(true);
        try {
          const results = await checkPlagiarism(text);
          setPlagiarismData(results);
        } catch (error) {
          console.error('Plagiarism check failed', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    detectPlagiarism();
  }, [text]);

  if (!plagiarismData) return null;

  const getOriginalityBadge = () => {
    const score = plagiarismData.originalityScore;
    if (score > 90) return 'success';
    if (score > 70) return 'warning';
    return 'destructive';
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="text-blue-500" />
          <h3 className="font-semibold">Originality Analysis</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant={getOriginalityBadge() as BadgeProps['variant']}>
                {Math.round(plagiarismData.originalityScore)}% Original
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              Percentage of unique content in your text
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {plagiarismData.potentialMatches.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Potential Matches:</h4>
          {plagiarismData.potentialMatches.map((match, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center bg-white p-3 rounded-md mb-2"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <Info className="text-yellow-500 h-4 w-4" />
                  <span className="font-medium">{match.source}</span>
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round(match.similarity)}% Similar
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <a 
                      href={match.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:bg-gray-100 p-2 rounded-full"
                    >
                      <Link2 className="h-4 w-4 text-blue-500" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    View potential source
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500 italic flex items-center space-x-2">
        <Check className="h-4 w-4 text-green-500" />
        <span>Plagiarism check completed</span>
      </div>
    </div>
  );
};

export default PlagiarismDetector;