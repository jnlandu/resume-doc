'use client';

import React from 'react';
import Link from 'next/link';
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  MessageSquare, 
  FileSearch 
} from 'lucide-react';
// import { Logo } from '@/components/Logo'; // Assuming you have a Logo component
import NavBar from '@/components/NavBar';

const products = [
  {
    id: 1,
    name: "Document Summarizer",
    description: "Transform lengthy documents into concise, actionable summaries with AI-powered precision.",
    price: "$4.99/month",
    features: [
      "Multi-format document support",
      "Customizable summary length",
      "Key insight extraction"
    ],
    icon: <FileText className="w-10 h-10 text-primary" />
  },
  {
    id: 2,
    name: "AI Document Assistant",
    description: "Engage in intelligent conversations with your documents through advanced natural language processing.",
    price: "$9.99/month",
    features: [
      "Context-aware Q&A",
      "Cross-document analysis",
      "Instant insight generation"
    ],
    icon: <MessageSquare className="w-10 h-10 text-primary" />
  },
  {
    id: 3,
    name: "Research Companion",
    description: "Elevate your research workflow with comprehensive document analysis and reporting.",
    price: "$24.99/month",
    features: [
      "Advanced research insights",
      "Comprehensive report generation",
      "Academic and professional support"
    ],
    icon: <FileSearch className="w-10 h-10 text-primary" />
  }
];

const Products = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="container mx-auto flex-1 px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Unlock Your Document Potential
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful AI tools designed to transform how you interact with documents, making information extraction and analysis seamless and intelligent.
          </p>
        </section>
        
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="flex flex-col hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                {product.icon}
                <CardTitle className="m-0">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <ul className="space-y-2 text-sm">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-xl font-bold">{product.price}</span>
                <Button>Get Started</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground">© 2024 ResumDoc. All rights reserved.</p>
          <nav className="flex space-x-4">
            <Link href="/privacy" className="text-sm hover:underline">Privacy</Link>
            <Link href="/terms" className="text-sm hover:underline">Terms</Link>
            <Link href="/contact" className="text-sm hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Products;