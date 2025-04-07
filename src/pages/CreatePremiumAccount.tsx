
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SubscriptionService } from '@/services/SubscriptionService';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CreatePremiumAccount = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);
    
    try {
      const response = await SubscriptionService.createPremiumTestAccount(email, password);
      setResult(response);
      
      if (response.success) {
        toast({
          title: "Account Created",
          description: "Premium test account has been created successfully.",
        });
      } else {
        toast({
          title: "Account Creation Failed",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating premium account:", error);
      setResult({
        success: false,
        message: `Unexpected error: ${error.message}`
      });
      
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold mb-3">Create Premium Test Account</h1>
            <p className="text-gray-600">This page is for demonstration purposes only</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Premium Account Generator</CardTitle>
              <CardDescription>Create an enterprise-tier test account</CardDescription>
            </CardHeader>
            
            <CardContent>
              {result && (
                <Alert 
                  className={`mb-6 ${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
                >
                  {result.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                  <AlertTitle className={result.success ? "text-green-800" : "text-red-800"}>
                    {result.success ? "Success" : "Error"}
                  </AlertTitle>
                  <AlertDescription className={result.success ? "text-green-700" : "text-red-700"}>
                    {result.message}
                  </AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="premium@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Minimum 6 characters"
                    minLength={6}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || !email || !password}
                >
                  {isSubmitting ? "Creating Account..." : "Create Premium Account"}
                </Button>
              </form>
            </CardContent>
            
            {result?.success && (
              <CardFooter className="flex flex-col items-start">
                <div className="bg-gray-50 p-4 rounded-md w-full">
                  <h3 className="font-medium mb-2">Your Account Credentials</h3>
                  <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2">
                    <span className="text-gray-600">Email:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">{email}</code>
                    <span className="text-gray-600">Password:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">********</code>
                    <span className="text-gray-600">Tier:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">Enterprise</code>
                  </div>
                </div>
              </CardFooter>
            )}
          </Card>
          
          {result?.success && (
            <div className="mt-6 text-center">
              <p className="text-green-800 mb-4">
                Your premium account has been created! You can now log in with the credentials above.
              </p>
              <Button variant="outline" onClick={() => window.location.href = '/login'}>
                Go to Login Page
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CreatePremiumAccount;
