import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock readability calculation
const calculateReadability = (text: string) => {
  const words = text.trim().split(/\s+/);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const syllableCount = words.reduce((count, word) => {
    return count + (word.match(/[aeiou]/gi) || []).length;
  }, 0);

  const fleschScore = 206.835 - 1.015 * (words.length / sentences.length) 
    - 84.6 * (syllableCount / words.length);

  return {
    score: Math.round(fleschScore),
    level: fleschScore > 80 ? 'Very Easy' :
           fleschScore > 70 ? 'Easy' :
           fleschScore > 60 ? 'Fairly Easy' :
           fleschScore > 50 ? 'Standard' :
           fleschScore > 30 ? 'Fairly Difficult' :
           'Difficult'
  };
};

const ReadabilityAnalysis = ({ text }: { text: string }) => {
  const [readability, setReadability] = useState<{ score: number; level: string } | null>(null);

  useEffect(() => {
    if (text) {
      const result = calculateReadability(text);
      setReadability(result);
    }
  }, [text]);

  if (!readability) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-purple-500" />
          Readability Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Readability Score</p>
              <p className="text-lg font-bold">{readability.score}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium">Reading Level</p>
              <Badge variant={
                readability.level === 'Very Easy' ? 'default' :
                readability.level === 'Easy' ? 'secondary' :
                readability.level === 'Standard' ? 'outline' : 
                'destructive'
              }>
                {readability.level}
              </Badge>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Interpretation</h4>
            <p className="text-xs text-gray-600">
              {readability.level === 'Very Easy' 
                ? 'Suitable for wide audiences, very clear language.' 
                : readability.level === 'Easy'
                ? 'Clear and straightforward text.'
                : readability.level === 'Fairly Easy'
                ? 'Moderately complex, requires some concentration.'
                : readability.level === 'Standard'
                ? 'Typical academic or professional writing.'
                : readability.level === 'Fairly Difficult'
                ? 'Complex text, challenging for general readers.'
                : 'Highly specialized or technical content.'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadabilityAnalysis;