// components/NavBar.tsx


'use client';
import Link from 'next/link'
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ProductDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const products = [
    { 
      name: 'Text Summarizer', 
      href: '/',
      description: 'Quickly summarize long documents'
    },
    { 
      name: 'Paraphraser', 
      href: '/products/paraphraser',
      description: 'Rewrite text while maintaining meaning'
    },
    { 
      name: 'Citation Generator', 
      href: '/products/citation-generator',
      description: 'Generate accurate citations'
    },
    { 
      name: 'OCR', 
      href: '/products/ocr',
      description: 'Convert images and scanned documents to text'
    },
    { 
      name: 'PDF Watermarker', 
      href: '/products/watermarker',
      description: 'Add custom watermarks to PDF documents'
    }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        Products
        <ChevronDown 
          className={`ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          color="currentColor"
          size={16} 
        />
      </button>
      
      {isOpen && (
        <div className="flex absolute z-10 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 ">
          {products.map((product) => (
            <a 
              key={product.href}
              href={product.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">{product.name}</span>
                <span className="text-sm text-gray-500">{product.description}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const NavBar = () => {
  return (
    // <div>NavBar</div>
    <div className='sticky top-0 z-50 bg-white shadow-md'>
    {/* <nav className="bg-white shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center p-4">
          
          <div className='flex items-center space-x-2 gap-10'>
            <div className="text-lg font-bold text-blue-600">
              <Link href="/">ResumDoc</Link>
            </div>
            <div className='flex items-center space-x-4'>
              <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
            </div>
          </div>
          <div className="flex space-x-4">
           
            <Link href="/signin" className="text-gray-700 hover:text-blue-600">
            <button className="bg-blue-600 text-white text-lg font-medium  px-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
            Sign In
            </button>
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600">About Us</Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </nav> */}
      <nav className="bg-white shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center p-4">
          <div className='flex items-center space-x-2 gap-10'>
            <div className="text-lg font-bold text-blue-600">
              <a href="/">ResumDoc</a>
            </div>
            <div className='max-md:hidden flex items-center space-x-4'>
              <ProductDropdown />
              <a href="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="/signin">
              <button className="bg-blue-600 text-white text-lg font-medium px-2 rounded-lg shadow hover:bg-blue-700 transition">
                Sign In
              </button>
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar