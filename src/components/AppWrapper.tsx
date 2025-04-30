
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AIChatbot from './AIChatbot';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Info } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import OnboardingFlow from './OnboardingFlow';
import NotificationCenter from './NotificationCenter';
import GlobalSearch from './GlobalSearch';
import ThemeToggle from './ThemeToggle';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import CurrencySelector from './CurrencySelector';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <CurrencyProvider>
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

        {/* Testing Mode and Currency Info */}
        <TooltipProvider>
          <div className="fixed bottom-3 left-3 z-30 flex flex-col space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs flex items-center bg-blue-500/10 text-blue-700 dark:text-blue-300 p-2 rounded-md">
                  <Info className="h-3 w-3 mr-1" />
                  <span>INVESTOR DEMO MODE</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">
                  All features are enabled for demonstration. All data is simulated including exchange rates, tax calculations, and financial reports.
                </p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs flex items-center bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 p-2 rounded-md">
                  <Info className="h-3 w-3 mr-1" />
                  <span>Using simulated exchange rate data</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Mock exchange rates are being used. In production, live rates from APIs would be used.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </>
    </CurrencyProvider>
  );
};

export default AppWrapper;
