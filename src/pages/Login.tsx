
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

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, user, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = "Login | Accountly";
    
    // If user is already logged in, redirect to dashboard
    if (user && !isLoading) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    // Clear error when user types
    if (formError) {
      setFormError(null);
    }
  };

  const validateForm = () => {
    if (!formData.email) {
      setFormError("Email is required");
      return false;
    }
    
    if (!formData.password) {
      setFormError("Password is required");
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
      await signIn(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
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
          <div className="text-center mb-8 animate-fade-up">
            <h1 className="text-4xl font-semibold mb-3">Welcome back</h1>
            <p className="text-gray-600">Log in to your Accountly account</p>
          </div>
          
          <div className="glass-card p-8 rounded-xl shadow-sm animate-fade-up" style={{animationDelay: '100ms'}}>
            {formError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
