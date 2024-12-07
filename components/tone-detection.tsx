import React, { useState, useMemo, useEffect } from 'react';
import { 
  Wand2, 
  Zap, 
  Target, 
  Smile, 
  Frown, 
  BookOpen, 
  Lightbulb 
} from 'lucide-react';

// Mock tone detection function (would be replaced by actual AI/NLP service)
const detectTextTone = (text: string) => {
  const lowercaseText = text.toLowerCase();
  
  const toneRules = [
    { 
      tone: 'formal', 
      keywords: ['therefore', 'moreover', 'furthermore', 'consequently'],
      regex: /\b(research|study|analysis|investigation)\b/
    },
    { 
      tone: 'casual', 
      keywords: ['like', 'basically', 'kinda', 'totally'],
      regex: /\b(cool|awesome|great)\b/
    },
    { 
      tone: 'academic', 
      keywords: ['hypothesis', 'methodology', 'empirical', 'theoretical'],
      regex: /\b(research|study|scientific|academic)\b/
    },
    { 
      tone: 'emotional', 
      keywords: ['feel', 'love', 'hate', 'terrible', 'amazing'],
      regex: /\b(emotion|feeling|passionate)\b/
    }
  ];

  const detectedTones = toneRules.filter(rule => 
    rule.keywords.some(keyword => lowercaseText.includes(keyword)) ||
    rule.regex.test(lowercaseText)
  );

  return detectedTones.length > 0 
    ? detectedTones.map(tone => tone.tone)[0] 
    : 'neutral';
};

// Mapping tone to recommended paraphrasing mode
const TONE_MODE_MAP = {
  'formal': 'standard',
  'casual': 'creative',
  'academic': 'concise',
  'emotional': 'creative',
  'neutral': 'standard'
};

const ToneBadge = ({ tone }: { tone: string }) => {
  const toneIcons = {
    'formal': <BookOpen className="mr-2 h-4 w-4 text-blue-500" />,
    'casual': <Smile className="mr-2 h-4 w-4 text-green-500" />,
    'academic': <Lightbulb className="mr-2 h-4 w-4 text-purple-500" />,
    'emotional': <Frown className="mr-2 h-4 w-4 text-red-500" />,
    'neutral': <Target className="mr-2 h-4 w-4 text-gray-500" />
  };

  return (
    <div className="flex items-center text-sm font-medium">
      {toneIcons[tone as keyof typeof toneIcons]}
      {tone.charAt(0).toUpperCase() + tone.slice(1)} Tone
    </div>
  );
};

const ToneDetectionSection = ({ text }: { text: string }) => {
  const [detectedTone, setDetectedTone] = useState('neutral');
  const [recommendedMode, setRecommendedMode] = useState('standard');

  useEffect(() => {
    if (text.trim()) {
      const tone = detectTextTone(text);
      const mode = TONE_MODE_MAP[tone as keyof typeof TONE_MODE_MAP];
      
      setDetectedTone(tone);
      setRecommendedMode(mode);
    }
  }, [text]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <ToneBadge tone={detectedTone} />
        <div className="text-sm text-gray-600">
          Recommended Mode: 
          <span className="font-semibold ml-2 text-blue-600">
            {recommendedMode.charAt(0).toUpperCase() + recommendedMode.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToneDetectionSection;