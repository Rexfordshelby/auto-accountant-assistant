
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center">
            <span className="text-white font-medium">A</span>
          </div>
          <span className="font-medium text-lg">Accountly</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Pricing</a>
          <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Testimonials</a>
          <a href="#dashboard" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Dashboard</a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="rounded-full px-5">Log in</Button>
          <Button className="bg-black text-white hover:bg-black/90 rounded-full px-5">Try for free</Button>
        </div>
        
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-50 p-6 animate-slide-down md:hidden">
          <nav className="flex flex-col gap-6 text-center">
            <a href="#features" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#pricing" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <a href="#testimonials" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
            <a href="#dashboard" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</a>
            
            <div className="flex flex-col gap-4 mt-4">
              <Button variant="outline" className="w-full">Log in</Button>
              <Button className="w-full bg-black text-white hover:bg-black/90">Try for free</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
