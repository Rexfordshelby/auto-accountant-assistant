
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
import { AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';
import { motion } from "framer-motion";

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
  const [showPassword, setShowPassword] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = "Login | Accountly";
    
    // Get stored redirect path
    const storedPath = sessionStorage.getItem('redirectPath');
    if (storedPath) {
      setRedirectPath(storedPath);
    }
    
    // If user is already logged in, redirect to dashboard or stored path
    if (user && !isLoading) {
      if (redirectPath) {
        navigate(redirectPath);
        sessionStorage.removeItem('redirectPath');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, isLoading, navigate, redirectPath]);

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
    // Enhanced validation
    if (!formData.email) {
      setFormError("Email is required");
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError("Please enter a valid email address");
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
      
      // If we have a redirect path, navigate there, otherwise go to dashboard
      if (redirectPath) {
        navigate(redirectPath);
        sessionStorage.removeItem('redirectPath');
      } else {
        navigate('/dashboard');
      }
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="animate-pulse">
          <Lock className="h-12 w-12 text-blue-500 mb-4" />
        </div>
        <p className="text-lg font-medium">Authenticating...</p>
        <p className="text-sm text-gray-500 mt-2">Setting up your secure session</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold mb-3">Welcome back</h1>
            <p className="text-gray-600">Log in to your secure Accountly account</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            {formError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              </motion.div>
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
                  className={`transition-all duration-200 ${formError && !formData.email ? "border-red-500 bg-red-50" : ""}`}
                  autoComplete="email"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    required 
                    value={formData.password}
                    onChange={handleChange}
                    className={`transition-all duration-200 ${formError && !formData.password ? "border-red-500 bg-red-50" : ""}`}
                    autoComplete="current-password"
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full transition-all duration-300 bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02] active:scale-[0.98]" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : "Log In Securely"}
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-medium">Sign up</Link>
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              Your security is important to us. We encrypt all data and use industry-standard security practices.
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
