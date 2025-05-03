
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiresAuth = true }) => {
  const { user, isLoading, session } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for session expiration
    if (session && session.expires_at) {
      const expiresAt = new Date(session.expires_at * 1000);
      const now = new Date();
      const timeLeft = expiresAt.getTime() - now.getTime();
      
      // If session expires in less than 5 minutes, show warning
      if (timeLeft > 0 && timeLeft < 300000) {
        toast({
          title: "Session expiring soon",
          description: "Your session will expire soon. Please save your work.",
          variant: "default", // Changed from "warning" to "default" to fix the build error
        });
      }
    }
  }, [session, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <Shield className="h-12 w-12 text-blue-500 animate-pulse mb-4" />
        <p className="text-lg font-medium">Verifying credentials...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we secure your session</p>
      </div>
    );
  }

  if (requiresAuth && !user) {
    // Store the intended path for redirect after login
    sessionStorage.setItem('redirectPath', location.pathname);
    
    return <Navigate to="/login" replace />;
  }

  // If we're on an auth page but already logged in, redirect to dashboard
  if (!requiresAuth && user && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
