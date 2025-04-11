
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import GlobalSearch from './GlobalSearch';
import NotificationCenter from './NotificationCenter';
import { Badge } from '@/components/ui/badge';
import { Loader2, ChevronDown, User, FileText, BarChart2, TrendingUp, Users, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { subscription, isLoading: subLoading } = useSubscription();
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Accountly</span>
              {!subLoading && subscription?.tier && subscription.tier !== 'free' && (
                <Badge className="ml-2 bg-blue-600 hover:bg-blue-700" variant="secondary">
                  {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
                </Badge>
              )}
            </Link>
            
            <nav className="hidden md:flex ml-10 space-x-6">
              <div className="relative group">
                <span className="cursor-pointer font-medium hover:text-blue-600 transition-colors flex items-center">
                  Services
                  <ChevronDown className="h-4 w-4 ml-1" />
                </span>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-1">
                    <Link to="/tax-services" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Tax Services</Link>
                    <Link to="/financial-advisory" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Financial Advisory</Link>
                    <Link to="/services/accounting" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Accounting</Link>
                    <Link to="/services/audit" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Audit</Link>
                    <Link to="/services/compliance" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Compliance</Link>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <span className="cursor-pointer font-medium hover:text-blue-600 transition-colors flex items-center">
                  Tools
                  <ChevronDown className="h-4 w-4 ml-1" />
                </span>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-1">
                    <Link to="/tools/tax-calculator" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Tax Calculator</Link>
                    <Link to="/tools/expense-tracker" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Expense Tracker</Link>
                    <Link to="/tools/invoice-generator" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Invoice Generator</Link>
                    <Link to="/tools/financial-projections" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Financial Projections</Link>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <span className="cursor-pointer font-medium hover:text-blue-600 transition-colors flex items-center">
                  Resources
                  <ChevronDown className="h-4 w-4 ml-1" />
                </span>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-1">
                    <Link to="/blog" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Blog</Link>
                    <Link to="/faq" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">FAQ</Link>
                    <Link to="/resources/guides" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Guides</Link>
                    <Link to="/resources/webinars" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Webinars</Link>
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
                  <Button variant="ghost" className="font-medium flex items-center gap-1">
                    My Account
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-2 px-1">
                      {subLoading ? (
                        <div className="px-4 py-2 text-sm flex items-center text-gray-500">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </div>
                      ) : subscription?.tier ? (
                        <div className="px-4 py-2 mb-1 border-b">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Current Plan</span>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
                            </span>
                            <Link to="/pricing">
                              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                {subscription.tier === 'free' ? 'Upgrade' : 'Manage'}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ) : null}
                      
                      <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-1">
                        <BarChart2 className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      
                      <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-1">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      
                      <Link to="/insights" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-1">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Financial Insights
                      </Link>
                      
                      <Link to="/clients" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-1">
                        <Users className="h-4 w-4 mr-2" />
                        Clients
                      </Link>
                      
                      <Link to="/reports" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-1">
                        <FileText className="h-4 w-4 mr-2" />
                        Reports
                      </Link>
                      
                      <Link to="/integrations" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-1">
                        <Settings className="h-4 w-4 mr-2" />
                        Integrations
                      </Link>

                      <div className="border-t my-1"></div>
                      
                      <button 
                        onClick={signOut}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-1"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
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
            <Link to="/tax-services" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Tax Services</Link>
            <Link to="/financial-advisory" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Financial Advisory</Link>
            <Link to="/tools/tax-calculator" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Tax Calculator</Link>
            <Link to="/tools/invoice-generator" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Invoice Generator</Link>
            <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Blog</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                <Link to="/clients" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Clients</Link>
                <Link to="/reports" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Reports</Link>
                <button 
                  onClick={signOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Sign In</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Create Account</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
