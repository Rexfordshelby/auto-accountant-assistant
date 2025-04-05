
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, metadata: Record<string, any>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for active session on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signUp(email: string, password: string, metadata: Record<string, any>) {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        }
      });
      
      if (error) {
        handleAuthError(error);
        throw error;
      }
      
      toast({
        title: "Account created successfully!",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      if (!(error instanceof AuthError)) {
        toast({
          title: "Error creating account",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        handleAuthError(error);
        throw error;
      }
      
      toast({
        title: "Login successful!",
        description: "Welcome back to Accountly.",
      });
    } catch (error: any) {
      if (!(error instanceof AuthError)) {
        toast({
          title: "Login failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
      throw error;
    }
  }

  function handleAuthError(error: AuthError) {
    let title = "Authentication Error";
    let message = error.message;
    
    // Customize error messages based on error type
    switch (error.message) {
      case "Invalid login credentials":
        title = "Invalid Credentials";
        message = "The email or password you entered is incorrect. Please try again.";
        break;
      case "Email not confirmed":
        title = "Email Not Verified";
        message = "Please check your email to confirm your account before logging in.";
        break;
      case "User already registered":
        title = "Account Already Exists";
        message = "An account with this email already exists. Try logging in instead.";
        break;
      case "Password should be at least 6 characters":
        title = "Password Too Short";
        message = "Your password must be at least 6 characters long.";
        break;
    }
    
    toast({
      title,
      description: message,
      variant: "destructive",
    });
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
