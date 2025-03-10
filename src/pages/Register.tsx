
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Create Account | Accountly";
    
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };
    
    // Animate on load for elements above the fold
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account created!",
      description: "Welcome to Accountly. You can now log in to access your account.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-32 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-on-scroll visible">
            <h1 className="text-4xl font-semibold mb-3">Create your account</h1>
            <p className="text-gray-600">Start managing your finances with Accountly</p>
          </div>
          
          <div className="glass-card p-8 rounded-xl shadow-sm animate-on-scroll">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
                <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business-type">Business Type</Label>
                <select 
                  id="business-type" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select an option</option>
                  <option value="sole-proprietor">Sole Proprietor</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="partnership">Partnership</option>
                  <option value="non-profit">Non-profit</option>
                </select>
              </div>
              
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
