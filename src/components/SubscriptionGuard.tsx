
import React from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { SubscriptionTier } from '@/services/SubscriptionService';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield, Loader2, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SubscriptionGuardProps {
  requiredTier: SubscriptionTier;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showAlert?: boolean;
}

const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ 
  requiredTier, 
  children,
  fallback,
  showAlert = true
}) => {
  const { hasAccess, isLoading } = useSubscription();
  
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3 p-4">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          <p className="text-sm text-gray-500">Checking subscription status...</p>
        </div>
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }
  
  // Always show the feature in test mode (all features are free)
  return <>{children}</>;
  
  // Note: The following code is commented out while in testing mode
  /*
  if (!hasAccess(requiredTier)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    if (!showAlert) {
      return null;
    }
    
    return (
      <Alert className="my-8 border-blue-200 bg-blue-50">
        <Shield className="h-5 w-5 text-blue-600" />
        <AlertTitle className="text-blue-800">Premium Feature</AlertTitle>
        <AlertDescription className="text-blue-700">
          <p className="mb-4">This feature requires a {requiredTier} subscription or higher.</p>
          <Link to="/pricing">
            <Button variant="outline" className="bg-white border-blue-600 text-blue-600 hover:bg-blue-50">
              Upgrade Your Plan
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }
  */
};

export default SubscriptionGuard;
