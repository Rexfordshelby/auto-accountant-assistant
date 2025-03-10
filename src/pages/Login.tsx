
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Login | Accountly";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login successful!",
      description: "Welcome back to Accountly.",
    });
    navigate('/dashboard');
  };

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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <Button type="submit" className="w-full">Log In</Button>
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
