import React, { useState } from 'react';
import { FileText, Copy, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const CitationGenerator = () => {
  const [citationStyle, setCitationStyle] = useState('apa');
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [generatedCitation, setGeneratedCitation] = useState('');

  const CITATION_STYLES = [
    { value: 'apa', label: 'APA' },
    { value: 'mla', label: 'MLA' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'harvard', label: 'Harvard' }
  ];

  const generateCitation = () => {
    let citation = '';
    switch(citationStyle) {
      case 'apa':
        citation = `${authorName}. (${year}). ${title}.`;
        break;
      case 'mla':
        citation = `${authorName}. "${title}." ${year}.`;
        break;
      case 'chicago':
        citation = `${authorName}, "${title}," ${year}.`;
        break;
      case 'harvard':
        citation = `${authorName} (${year}), ${title}.`;
        break;
      default:
        citation = `${authorName}, ${title}, ${year}`;
    }
    setGeneratedCitation(citation);
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(generatedCitation);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-6 w-6 text-green-500" />
          Citation Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Citation Style</label>
              <Select 
                value={citationStyle}
                onValueChange={setCitationStyle}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Citation Style" />
                </SelectTrigger>
                <SelectContent>
                  {CITATION_STYLES.map(style => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year of Publication</label>
              <Input 
                type="text" 
                placeholder="Enter year" 
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Author Name</label>
            <Input 
              type="text" 
              placeholder="Enter author name" 
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Textarea 
              placeholder="Enter title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={generateCitation}
              disabled={!authorName || !title || !year}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Generate Citation
            </Button>
          </div>

          {generatedCitation && (
            <div className="mt-4 bg-gray-100 p-3 rounded-md flex justify-between items-center">
              <p className="text-sm">{generatedCitation}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCopyCitation}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CitationGenerator;