
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

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
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-black/90" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-black dark:bg-white flex items-center justify-center">
            <span className="text-white dark:text-black font-medium">A</span>
          </div>
          <span className="font-medium text-lg">Accountly</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/tax-services" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Tax Services</Link>
          <Link to="/financial-advisory" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Advisory</Link>
          <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Pricing</Link>
          <Link to="/allaboutme" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">About Me</Link>
          <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Contact</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          
          {user ? (
            <Link to="/dashboard">
              <Button variant="outline" className="rounded-full px-5">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="rounded-full px-5">Log in</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-full px-5">Sign up</Button>
              </Link>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-gray-900 z-50 p-6 animate-slide-down md:hidden">
          <nav className="flex flex-col gap-6 text-center">
            <Link to="/tax-services" className="text-lg font-medium py-2 border-b border-gray-100 dark:border-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Tax Services</Link>
            <Link to="/financial-advisory" className="text-lg font-medium py-2 border-b border-gray-100 dark:border-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Advisory</Link>
            <Link to="/pricing" className="text-lg font-medium py-2 border-b border-gray-100 dark:border-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/allaboutme" className="text-lg font-medium py-2 border-b border-gray-100 dark:border-gray-800" onClick={() => setIsMobileMenuOpen(false)}>About Me</Link>
            <Link to="/contact" className="text-lg font-medium py-2 border-b border-gray-100 dark:border-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            
            <div className="flex flex-col gap-4 mt-4">
              {user ? (
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
