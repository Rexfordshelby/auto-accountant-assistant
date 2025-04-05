
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp, user, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = "Create Account | Accountly";
    
    // If user is already logged in, redirect to dashboard
    if (user && !isLoading) {
      navigate('/dashboard');
    }
    
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
  }, [user, isLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id === 'business-type' ? 'businessType' : id]: value
    });
    // Clear error when user types
    if (formError) {
      setFormError(null);
    }
  };

  const validateForm = () => {
    if (!formData.name) {
      setFormError("Full name is required");
      return false;
    }
    
    if (!formData.email) {
      setFormError("Email is required");
      return false;
    }
    
    if (!formData.password) {
      setFormError("Password is required");
      return false;
    }
    
    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters long");
      return false;
    }
    
    if (!formData.businessType) {
      setFormError("Please select a business type");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      await signUp(formData.email, formData.password, {
        full_name: formData.name,
        business_type: formData.businessType
      });
      
      // Navigate to login page after successful registration
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (!error.message.includes("Toast")) { // Avoid duplicate error messages
        setFormError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
            {formError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className={formError && !formData.name ? "border-red-500" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className={formError && !formData.email ? "border-red-500" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  className={formError && !formData.password ? "border-red-500" : ""}
                />
                <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business-type">Business Type</Label>
                <select 
                  id="business-type" 
                  className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    formError && !formData.businessType ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="sole-proprietor">Sole Proprietor</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="partnership">Partnership</option>
                  <option value="non-profit">Non-profit</option>
                </select>
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
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
