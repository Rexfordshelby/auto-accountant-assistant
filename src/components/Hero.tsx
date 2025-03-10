
import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import AnimatedNumber from './AnimatedNumbers';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a parallax effect on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      // Parallax effect for background
      heroRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-0"></div>
      
      {/* Moving background shapes */}
      <div className="absolute top-1/4 -left-24 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 -right-24 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block animate-fade-in text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-6">
            The Future of Accounting is Here
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 animate-fade-up" style={{animationDelay: '100ms'}}>
            Accounting, <span className="text-blue-500">Reimagined</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-up" style={{animationDelay: '200ms'}}>
            Replace your accountant with AI-powered tools that handle everything from bookkeeping to tax filing. Designed for modern businesses.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{animationDelay: '300ms'}}>
            <Button 
              className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-6 text-lg"
              asChild
            >
              <Link to="/register">Get Started</Link>
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full px-8 py-6 text-lg"
              asChild
            >
              <Link to="/tools/tax-calculator">See Demo</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-up" style={{animationDelay: '400ms'}}>
            <div className="glass-card p-6 rounded-2xl hover-lift">
              <div className="font-semibold text-4xl mb-2">
                <AnimatedNumber value={99} suffix="%" />
              </div>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div className="glass-card p-6 rounded-2xl hover-lift">
              <div className="font-semibold text-4xl mb-2">
                <AnimatedNumber value={10000} formatter={(val) => val.toLocaleString()} suffix="+" />
              </div>
              <p className="text-gray-600">Businesses Using Accountly</p>
            </div>
            <div className="glass-card p-6 rounded-2xl hover-lift">
              <div className="font-semibold text-4xl mb-2">
                <AnimatedNumber value={20} prefix="$" suffix="B" />
              </div>
              <p className="text-gray-600">Processed Annually</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ 
        borderTopLeftRadius: '50% 100%', 
        borderTopRightRadius: '50% 100%',
        transform: 'scaleX(1.5)' 
      }}></div>
    </div>
  );
};

export default Hero;
