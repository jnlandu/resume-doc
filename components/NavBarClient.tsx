'use client'

import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import NavBar from './NavBar';
import Link from 'next/link';

const NavBarClient = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const menuItems = [
      { name: 'Home', href: '#' },
      { name: 'About', href: '#about' },
      { name: 'Features', href: '/products/' },
      { name: 'Sign In', href: '/signin' },
      { name: 'Contact', href: '#contact' },
    ];
  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 relative">
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
    </div>

  )
}

export default NavBarClient