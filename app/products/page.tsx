'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  MessageSquare, 
  Zap, 
  Bot, 
  FileSearch, 
  Sparkles 
} from 'lucide-react';
import NavBar from '@/components/NavBar';

const products = [
  {
    id: 1,
    name: "Document Summarizer",
    description: "Instantly generate concise, accurate summaries of complex documents with AI-powered precision.",
    price: "$9.99/month",
    features: [
      "Multi-format support (PDF, DOCX, TXT)",
      "Customizable summary length",
      "Key point extraction"
    ],
    imageUrl: "/images/summarizer.png",
    icon: <FileText className="w-10 h-10 text-blue-500" />
  },
  {
    id: 2,
    name: "AI Document Chat",
    description: "Interact with your documents through intelligent conversational AI.",
    price: "$14.99/month",
    features: [
      "Context-aware Q&A",
      "Multi-document analysis",
      "Natural language understanding"
    ],
    imageUrl: "/images/ai-chat.png",
    icon: <MessageSquare className="w-10 h-10 text-green-500" />
  },
  {
    id: 3,
    name: "Advanced Research Assistant",
    description: "Comprehensive research tool that extracts insights and generates comprehensive reports.",
    price: "$24.99/month",
    features: [
      "Cross-document research",
      "Academic and professional report generation",
      "Citation tracking"
    ],
    imageUrl: "/images/research-assistant.png",
    icon: <FileSearch className="w-10 h-10 text-purple-500" />
  }
];


const Products = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <NavBar />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          ResumDoc Product Suite
        </h1>
        <p className="text-xl text-gray-600">
          Empower your document workflow with AI-driven intelligent tools
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center space-x-4">
              {product.icon}
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">{product.price}</span>
              <Button>
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Why Choose ResumDoc?
        </h2>
        <div className="flex justify-center space-x-8 text-gray-600">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-indigo-500" />
            <span>Advanced AI Technology</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <span>Intelligent Insights</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;