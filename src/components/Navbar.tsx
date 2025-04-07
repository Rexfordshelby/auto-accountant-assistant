
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import GlobalSearch from './GlobalSearch';
import NotificationCenter from './NotificationCenter';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { subscription } = useSubscription();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isPricingPage = location.pathname === '/pricing';
  const isAuthenticated = !!user;
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Accountly</span>
              {subscription?.tier && (
                <Badge className="ml-2 bg-blue-600 hover:bg-blue-700" variant="secondary">
                  {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
                </Badge>
              )}
            </Link>
            
            <nav className="hidden md:flex ml-10 space-x-6">
              <div className="relative group">
                <span className="cursor-pointer font-medium hover:text-blue-600 transition-colors">
                  Services
                </span>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-1">
                    <Link to="/tax-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Tax Services</Link>
                    <Link to="/financial-advisory" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Financial Advisory</Link>
                    <Link to="/services/accounting" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Accounting</Link>
                    <Link to="/services/audit" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Audit</Link>
                    <Link to="/services/compliance" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Compliance</Link>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <span className="cursor-pointer font-medium hover:text-blue-600 transition-colors">
                  Tools
                </span>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-1">
                    <Link to="/tools/tax-calculator" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Tax Calculator</Link>
                    <Link to="/tools/expense-tracker" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Expense Tracker</Link>
                    <Link to="/tools/invoice-generator" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Invoice Generator</Link>
                    <Link to="/tools/financial-projections" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Financial Projections</Link>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <span className="cursor-pointer font-medium hover:text-blue-600 transition-colors">
                  Resources
                </span>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-1">
                    <Link to="/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Blog</Link>
                    <Link to="/faq" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">FAQ</Link>
                    <Link to="/resources/guides" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Guides</Link>
                    <Link to="/resources/webinars" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Webinars</Link>
                  </div>
                </div>
              </div>
              
              <Link to="/about" className="font-medium hover:text-blue-600 transition-colors">About</Link>
              <Link to="/contact" className="font-medium hover:text-blue-600 transition-colors">Contact</Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <GlobalSearch />
            
            {isAuthenticated ? (
              <>
                <NotificationCenter />
                <div className="relative group">
                  <Button variant="ghost" className="font-medium">
                    My Account
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                      <Link to="/insights" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Financial Insights</Link>
                      <Link to="/integrations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Integrations</Link>
                      <button 
                        onClick={signOut}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="font-medium">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="font-medium">Create Account</Button>
                </Link>
              </>
            )}
            
            <ThemeToggle />
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/tax-services" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Tax Services</Link>
            <Link to="/financial-advisory" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Financial Advisory</Link>
            <Link to="/tools/tax-calculator" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Tax Calculator</Link>
            <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Blog</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Dashboard</Link>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Profile</Link>
                <button 
                  onClick={signOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Sign In</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">Create Account</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
