
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";
import { useNotification } from '@/contexts/NotificationContext';
import { 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Landmark, 
  Building, 
  Store, 
  Home, 
  User, 
  Users 
} from 'lucide-react';

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Accountly!',
    description: 'Let's set up your account in a few quick steps.',
  },
  {
    id: 'businessType',
    title: 'Tell us about your business',
    description: 'This helps us tailor our service to your needs.',
  },
  {
    id: 'preferences',
    title: 'Set your preferences',
    description: 'Customize your experience with Accountly.',
  },
  {
    id: 'complete',
    title: 'All set!',
    description: 'Your account is ready to use.',
  }
];

const businessTypes = [
  { id: 'corporation', label: 'Corporation', icon: <Building className="h-5 w-5" /> },
  { id: 'sole_proprietor', label: 'Sole Proprietor', icon: <User className="h-5 w-5" /> },
  { id: 'partnership', label: 'Partnership', icon: <Users className="h-5 w-5" /> },
  { id: 'llc', label: 'LLC', icon: <Landmark className="h-5 w-5" /> },
  { id: 'small_business', label: 'Small Business', icon: <Store className="h-5 w-5" /> },
  { id: 'personal', label: 'Personal Finance', icon: <Home className="h-5 w-5" /> },
];

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessType, setBusinessType] = useState<string>('');
  const [companyName, setCompanyName] = useState('');
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    monthlyReports: true,
    taxReminders: true,
  });
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Update user profile with onboarding data
      const { error } = await supabase
        .from('profiles')
        .update({
          business_type: businessType,
          company_name: companyName,
          onboarding_completed: true,
          preferences: preferences,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Setup complete!",
        description: "Your account is ready to use.",
      });
      
      addNotification(
        "Welcome to Accountly!",
        "Your account has been set up successfully.",
        "success"
      );
      
      onComplete();
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      
      toast({
        title: "Error saving your preferences",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBusinessTypeSelect = (type: string) => {
    setBusinessType(type);
  };

  const handlePreferenceChange = (preference: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [preference]: !preferences[preference],
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="text-center p-4">
            <div className="mb-6">
              <img 
                src="/logo.png" 
                alt="Accountly Logo" 
                className="w-28 h-28 mx-auto" 
              />
            </div>
            <p className="text-lg mb-4">
              Welcome to Accountly, your all-in-one accounting solution.
            </p>
            <p className="text-muted-foreground">
              Let's set up your account to get the most out of our platform.
            </p>
          </div>
        );
      
      case 1: // Business Type
        return (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {businessTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    businessType === type.id 
                      ? 'border-primary bg-primary/10' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleBusinessTypeSelect(type.id)}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className={`p-2 rounded-full ${
                      businessType === type.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-accent'
                    }`}>
                      {type.icon}
                    </div>
                    <span className="font-medium">{type.label}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Business/Company Name</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your business name"
                />
              </div>
            </div>
          </div>
        );
      
      case 2: // Preferences
        return (
          <div className="p-4 space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="emailNotifications" 
                checked={preferences.emailNotifications}
                onCheckedChange={() => handlePreferenceChange('emailNotifications')}
              />
              <div>
                <Label htmlFor="emailNotifications" className="text-base font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about your account and financial activities.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="monthlyReports" 
                checked={preferences.monthlyReports}
                onCheckedChange={() => handlePreferenceChange('monthlyReports')}
              />
              <div>
                <Label htmlFor="monthlyReports" className="text-base font-medium">
                  Monthly Financial Reports
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get a monthly summary of your financial status.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="taxReminders" 
                checked={preferences.taxReminders}
                onCheckedChange={() => handlePreferenceChange('taxReminders')}
              />
              <div>
                <Label htmlFor="taxReminders" className="text-base font-medium">
                  Tax Deadline Reminders
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive reminders about upcoming tax deadlines.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 3: // Complete
        return (
          <div className="text-center p-4">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">You're all set!</h3>
            <p className="mb-4">
              Your account has been configured successfully.
            </p>
            <p className="text-muted-foreground mb-6">
              Explore your dashboard now and start managing your finances with Accountly.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {steps[currentStep].title}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <div className="w-full h-1 bg-accent mt-2 overflow-hidden rounded-full">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={currentStep === 1 && !businessType}
              className="gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              disabled={isSubmitting}
              className="gap-1"
            >
              Get Started
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
