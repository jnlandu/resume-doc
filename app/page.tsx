'use client';

import Link from 'next/link';
import { Metadata } from "next";
import PDFUploader from "@/components/pdf-uploader";
import PDFViewer from "@/components/pdf-viewer";
import Summary from "@/components/summary";
import Chat from "@/components/chat";
import { useEffect, useState } from "react";
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Add animation class to feedback section on mount
    const feedbackSection = document.getElementById('feedback');
    if (feedbackSection) {
      feedbackSection.classList.add('fade-in');
    }
  }, []);
  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <main className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen relative">
      {/* Mobile Menu Button */}
      {/* // Replace the SVG section with: */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg bg-white shadow-md focus:outline-none"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-white z-40 transform ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out md:hidden`}>
              <div className="pt-16 px-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-3 text-lg font-medium text-gray-900 border-b border-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
      {/* Regular NavBar (hidden on mobile device) */}
      <div className="hidden md:block">
        <NavBar />
      </div>

      <Hero />

      {/* Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <div id="uploader" className="bg-white shadow-lg rounded-lg p-4 md:p-6">
          <PDFUploader />
          <PDFViewer />
        </div>
        <div id="summary" className="bg-white shadow-lg rounded-lg p-4 md:p-6 space-y-4 md:space-y-8">
          <Summary />
          <Chat />
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="mt-8 md:mt-12 bg-white shadow-md rounded-xl p-6 md:p-10 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-gray-900 border-b-4 pb-3 border-blue-500">
          About Us
        </h2>
        <div className="space-y-4 text-base md:text-lg text-gray-700">
          {/* About content remains the same */}
        </div>
      </section>

      {/* Rest of the sections with responsive adjustments */}
      <section id="feedback" className="mt-8 md:mt-16 bg-white shadow-md rounded-xl p-6 md:p-10">
        {/* Feedback section content */}
      </section>

      <section id="contact" className="mt-8 md:mt-16 bg-gray-50 shadow-md rounded-xl p-6 md:p-10">
        {/* Contact section content */}
      </section>
    </main>
  );
}