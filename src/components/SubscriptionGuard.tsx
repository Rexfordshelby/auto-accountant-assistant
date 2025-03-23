
import React from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { SubscriptionTier } from '@/services/SubscriptionService';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

interface SubscriptionGuardProps {
  requiredTier: SubscriptionTier;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ 
  requiredTier, 
  children,
  fallback
}) => {
  const { hasAccess, isLoading } = useSubscription();
  
  if (isLoading) {
    return <div className="flex justify-center p-4">Loading...</div>;
  }
  
  if (!hasAccess(requiredTier)) {
    if (fallback) {
      return <>{fallback}</>;
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
  
  return <>{children}</>;
};

export default SubscriptionGuard;
