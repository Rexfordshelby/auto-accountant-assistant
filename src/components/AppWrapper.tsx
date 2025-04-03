
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AIChatbot from './AIChatbot';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import OnboardingFlow from './OnboardingFlow';
import NotificationCenter from './NotificationCenter';
import GlobalSearch from './GlobalSearch';
import ThemeToggle from './ThemeToggle';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Check if user is new and needs onboarding
    // This would typically check a profile field in a real app
    if (user && location.pathname === '/dashboard') {
      const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted');
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [user, location]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboardingCompleted', 'true');
  };

  return (
    <>
      {children}
      
      {/* Fixed position elements */}
      <div className="fixed top-6 right-6 z-30 flex items-center gap-4">
        {/* Global search and theme toggle already handled in Navbar */}
      </div>
      
      {/* Chatbot button */}
      {user && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button 
            onClick={toggleChat}
            className="rounded-full h-14 w-14 shadow-lg"
            aria-label="Open AI assistant"
          >
            {isChatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </Button>
        </div>
      )}
      
      {/* AI Chatbot */}
      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Onboarding Flow */}
      {showOnboarding && user && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
    </>
  );
};

export default AppWrapper;
