import React from 'react';
import { 
  Type, 
  Layers, 
  Shield, 
  Clock, 
  Languages, 
  Cpu, 
  Star
} from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const ParaphraserFeatures = () => {
  const featuresList = [
    {
      icon: <Type size={24} className="text-blue-600" />,
      title: "Advanced Paraphrasing Modes",
      description: "Choose from three sophisticated paraphrasing modes tailored to your writing needs:",
      details: [
        "Standard Mode: Maintains the original meaning while improving clarity and flow",
        "Creative Mode: Generates more imaginative and unique text variations",
        "Concise Mode: Shortens text while preserving core message and intent"
      ]
    },
    {
      icon: <Languages size={24} className="text-green-600" />,
      title: "Multilingual Support",
      description: "Paraphrase and transform text across multiple languages with precision:",
      details: [
        "Supports English, Spanish, French, German, and Portuguese",
        "Preserve original meaning across language boundaries",
        "Maintain cultural and linguistic nuances"
      ]
    },
    {
      icon: <Shield size={24} className="text-red-600" />,
      title: "Plagiarism Prevention",
      description: "Integrated tools to ensure original and unique content:",
      details: [
        "Real-time plagiarism detection",
        "Originality score for your text",
        "Suggestions for improving text uniqueness"
      ]
    },
    {
      icon: <Cpu size={24} className="text-purple-600" />,
      title: "AI-Powered Intelligence",
      description: "Leveraging cutting-edge AI technology for superior text transformation:",
      details: [
        "Machine learning algorithms for contextual understanding",
        "Natural language processing for semantic preservation",
        "Continuous improvement through advanced neural networks"
      ]
    },
    {
      icon: <Clock size={24} className="text-orange-600" />,
      title: "Efficiency and Limitations",
      description: "Designed for quick, effective writing enhancement:",
      details: [
        "Maximum 250 words per paraphrasing session",
        "Instant text transformation",
        "Ideal for academic, professional, and creative writing"
      ]
    }
  ];

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        <Star className="inline-block mr-3 text-yellow-500" size={32} />
        ResumDoc AI: Features & Capabilities
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {featuresList.map((feature, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="hover:bg-gray-100 px-4 rounded-md">
              <div className="flex items-center space-x-4">
                {feature.icon}
                <span className="text-lg font-semibold text-gray-800">
                  {feature.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gray-50 rounded-md">
              <p className="text-gray-700 mb-3">{feature.description}</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ParaphraserFeatures;