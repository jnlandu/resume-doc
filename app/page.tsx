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
    { name: 'Sign In', href: '#signin' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <main className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen relative">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg bg-white shadow-lg focus:outline-none transition-all duration-300"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      {/* Mobile Menu */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white z-40 transform transition-all duration-300 ease-in-out lg:hidden
        ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className="pt-16 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-3 text-lg font-medium text-gray-900 border-b border-gray-200 transition-colors hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Regular NavBar (hidden on mobile) */}
      <div className="hidden md:block">
        <NavBar />
      </div>
      {/* Hero Section */}
      <Hero/>
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div id="uploader" className="bg-white shadow-lg rounded-lg p-6">
          <PDFUploader />
          <PDFViewer />
        </div>
        <div id="summary" className="bg-white shadow-lg rounded-lg p-6 space-y-8">
          <Summary />
          <Chat />
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="mt-12 bg-white shadow-md rounded-xl p-10 lg:px-16 lg:py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 border-b-4 pb-3 border-blue-500">About Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          <strong className="text-gray-900">ResumDoc</strong> is a cutting-edge tool designed to help
          you seamlessly summarize and interact with your PDF documents. Our goal is to provide an
          intuitive, powerful platform that simplifies document workflows and boosts productivity.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Whether you're a student summarizing research papers or a professional organizing critical
          documents, <strong className="text-gray-900">ResumDoc</strong> delivers the tools you need to
          work smarter, not harder.
        </p>
      </section>

      {/* User Feedback Section */}
      <section id="feedback" className="mt-16 bg-white shadow-md rounded-xl p-10 lg:px-16 lg:py-12 max-w-5xl mx-auto transition-transform transform hover:-translate-y-[2px] duration-200 ease-in-out">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 border-b-4 pb-3 border-blue-500">What Our Users Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          {/* Feedback Card */}
          {[
            {
              name: "Kellie Marline",
              username: "@klmarline",
              feedback: "ResumDoc has completely changed the way I handle my research papers. Summarizing PDFs is now a breeze. Highly recommended!",
              imageUrl: "https://via.placeholder.com/150/000000/FFFFFF/?text=KM", // Placeholder for black-and-white image
            },
            {
              name: "Yves Kabongo",
              username: "@yveskabongo",
              feedback: "En tant qu'étudiant, ResumDoc a été un sauveur ! C'est comme avoir un assistant personnel pour résumer tous mes documents d'étude.",             
               imageUrl: "https://via.placeholder.com/150/000000/FFFFFF/?text=YK", // Placeholder for black-and-white image
            },
            {
              name: "Francis Mayala",
              username: "@fmayala",
              feedback: "La fonctionnalité de chat est révolutionnaire. Je peux interagir avec mes PDF et obtenir des résumés instantanément. ResumDoc vaut chaque centime !",
              imageUrl: "https://via.placeholder.com/150/000000/FFFFFF/?text=FM", // Placeholder for black-and-white image
            },
          ].map((user) => (
            <div key={user.username} className="max-md:flex-col bg-gray-100 shadow-lg rounded-lg p-6 flex items-start transition-transform transform hover:-translate-y-[2px] duration-200 ease-in-out">
              <div className="sm:hidden flex items-center mb-4">
                <img src={user.imageUrl} alt={`${user.name}'s Avatar`} className="w-16 h-16 rounded-full border border-gray-300 mr-4" />
                <div>
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.username}</p>
                </div>
              </div>
              <img src={user.imageUrl} alt={`${user.name}'s Avatar`} className="max-sm:hidden w-[60px] h-[60px] rounded-full border border-gray-300 mr-4" />
              <div className=''>
                <p className="max-sm:hidden text-gray-800 font-semibold">{user.name}</p>
                <p className="max-sm:hidden text-sm text-gray-500">{user.username}</p>
                <p className="text-gray-700 leading-relaxed mt-2">{user.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mt-16 bg-gray-50 shadow-md rounded-xl p-10 lg:px-16 lg:py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 border-b-4 pb3 border-blue500">Contact Us</h2>
        <p className="text-lg text-gray700 leading-relaxed mb6">
          We'd love to hear from you! Have questions, suggestions, or feedback? Get in touch with us via the following channels:
        </p>
        <ul className="space-y4 text-lg">
          <li>
            <strong className="text-gray900">Email:</strong>{' '}
            <a href="mailto:support@resumdoc.com" className="text-blue600 hover:text-blue800 underline">support@resumdoc.com</a>
          </li>
          <li>
            <strong className="text-gray900">Phone:</strong>{' '}
            <span>(+221) 77 200 38 35 </span>
          </li>
          <li>
            <strong className="text-gray900">Address:</strong>{' '}
            <span> Mbour, Senegal</span>
          </li>
        </ul>
        <div className="mt8">
          <a href = "mailto:support@resumdoc.com"
             className = "inline-block bg-blue600 text-white text-lg font-medium py3 px6 roundedlg shadow hover:bg-blue700 transition"
           >
             Get in Touch
           </a >
         </div >
       </section >
     </main >
   );
 }