
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";

// Define constants for security
const SESSION_REFRESH_THRESHOLD = 10 * 60; // 10 minutes in seconds
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, metadata: Record<string, any>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

interface LoginAttemptsState {
  count: number;
  lastAttempt: number;
  lockedUntil: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Load login attempts from sessionStorage
const getLoginAttempts = (): LoginAttemptsState => {
  const stored = sessionStorage.getItem('loginAttempts');
  if (stored) {
    return JSON.parse(stored);
  }
  return { count: 0, lastAttempt: 0, lockedUntil: null };
};

// Save login attempts to sessionStorage
const saveLoginAttempts = (attempts: LoginAttemptsState): void => {
  sessionStorage.setItem('loginAttempts', JSON.stringify(attempts));
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [loginAttempts, setLoginAttempts] = useState<LoginAttemptsState>(getLoginAttempts());

  // Session management
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

  // Session refresh setup
  useEffect(() => {
    if (!session) return;
    
    // Set up refresh timer when session is close to expiry
    const expiresAt = session.expires_at;
    if (!expiresAt) return;
    
    const timeNow = Math.floor(Date.now() / 1000);
    const timeToRefresh = expiresAt - timeNow - SESSION_REFRESH_THRESHOLD;
    
    if (timeToRefresh <= 0) {
      // Refresh now if already past threshold
      refreshSession();
      return;
    }
    
    // Set timer to refresh before expiry
    const refreshTimer = setTimeout(() => {
      refreshSession();
    }, timeToRefresh * 1000);
    
    return () => clearTimeout(refreshTimer);
  }, [session]);

  async function refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      setSession(data.session);
      setUser(data.session?.user ?? null);
      
      console.log("Session refreshed successfully");
    } catch (error) {
      console.error("Failed to refresh session:", error);
      // Force logout if refresh fails
      await signOut();
    }
  }

  async function signUp(email: string, password: string, metadata: Record<string, any>) {
    try {
      // Validate password strength
      if (password.length < 10 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || 
          !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
        throw new Error("Password must be at least 10 characters and include uppercase, lowercase, numbers, and special characters");
      }
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
            created_at: new Date().toISOString()
          },
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
      
      // Reset login attempts after successful signup
      resetLoginAttempts();
    } catch (error: any) {
      if (!(error instanceof AuthError)) {
        toast({
          title: "Error creating account",
          description: error.message || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      // Check if account is locked
      if (loginAttempts.lockedUntil && loginAttempts.lockedUntil > Date.now()) {
        const minutesLeft = Math.ceil((loginAttempts.lockedUntil - Date.now()) / 60000);
        throw new Error(`Too many failed login attempts. Please try again in ${minutesLeft} minutes.`);
      }

      // Update login attempts
      const updatedAttempts = { 
        ...loginAttempts,
        count: loginAttempts.count + 1,
        lastAttempt: Date.now()
      };
      
      // Check if we should lock the account
      if (updatedAttempts.count >= MAX_LOGIN_ATTEMPTS) {
        updatedAttempts.lockedUntil = Date.now() + LOCKOUT_DURATION;
        setLoginAttempts(updatedAttempts);
        saveLoginAttempts(updatedAttempts);
        throw new Error(`Too many failed login attempts. Account locked for 15 minutes.`);
      }
      
      setLoginAttempts(updatedAttempts);
      saveLoginAttempts(updatedAttempts);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        handleAuthError(error);
        throw error;
      }
      
      // Reset login attempts after successful login
      resetLoginAttempts();
      
      toast({
        title: "Login successful!",
        description: "Welcome back to Accountly.",
      });
    } catch (error: any) {
      if (!(error instanceof AuthError)) {
        toast({
          title: "Login failed",
          description: error.message || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
      throw error;
    }
  }

  function resetLoginAttempts() {
    const resetAttempts = { count: 0, lastAttempt: Date.now(), lockedUntil: null };
    setLoginAttempts(resetAttempts);
    saveLoginAttempts(resetAttempts);
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
        title = "Password Too Weak";
        message = "Your password must be at least 10 characters and include uppercase, lowercase, numbers, and special characters.";
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
      
      // Clear any session data
      sessionStorage.removeItem('redirectPath');
      
      toast({
        title: "Signed out successfully",
        description: "You have been securely logged out."
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
    signOut,
    refreshSession
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
