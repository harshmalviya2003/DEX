'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-2 right-2 md:left-8 md:right-8 z-50 h-16 transition-all duration-500 rounded-full max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 ${
        scrolled
          ? 'bg-gray-50 border border-gray-200 shadow-sm'
          : 'bg-transparent border border-transparent shadow-none'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center" tabIndex={0} aria-label="Go to homepage">
          <span className="mr-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16L16 4L24 16L16 28L8 16Z" fill="#757575"/>
            </svg>
          </span>
          <span className="text-2xl font-extrabold text-gray-600 tracking-tight">DEX</span>
        </Link>
      </div>

      {/* Hamburger for mobile */}
      <button
        className="md:hidden ml-auto p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        <svg
          className="h-7 w-7 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {/* Centered Nav Links (desktop) */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="flex space-x-10">
          <Link href="/" className="text-gray-600 text-lg font-medium hover:text-black transition-colors">Features</Link>
          <Link href="/" className="text-gray-600 text-lg font-medium hover:text-black transition-colors">Uses</Link>
          <Link href="/" className="text-gray-600 text-lg font-medium hover:text-black transition-colors">Careers</Link>
        </div>
      </div>

      {/* Contact Button (desktop) */}
      <div className="hidden md:block">
        <Link href="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-7 py-2 rounded-full shadow transition-all focus:outline-none">
            Contact
          </button>
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-20 left-0 right-0 mx-2 rounded-2xl bg-white border border-gray-200 shadow-lg flex flex-col items-center space-y-4 py-6 z-50 md:hidden animate-fade-in"
          role="menu"
        >
          <Link href="/features" className="text-gray-700 text-lg font-medium hover:text-black transition-colors w-full text-center py-2" role="menuitem" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="/uses" className="text-gray-700 text-lg font-medium hover:text-black transition-colors w-full text-center py-2" role="menuitem" onClick={() => setMenuOpen(false)}>Uses</Link>
          <Link href="/careers" className="text-gray-700 text-lg font-medium hover:text-black transition-colors w-full text-center py-2" role="menuitem" onClick={() => setMenuOpen(false)}>Careers</Link>
          <Link href="/contact" className="w-full flex justify-center" onClick={() => setMenuOpen(false)}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-7 py-2 rounded-full shadow transition-all focus:outline-none w-full max-w-xs">
              Contact
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}