
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  RefreshCw, 
  Link as LinkIcon, 
  CheckCircle, 
  AlertCircle,
  XCircle, 
  ArrowRightCircle 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { useNotification } from '@/contexts/NotificationContext';
import { 
  ExternalToolsService, 
  ExternalToolConnection, 
  ToolProvider, 
  availableProviders 
} from '@/services/ExternalToolsService';
import { format } from 'date-fns';

const IntegrationsPage: React.FC = () => {
  const [connections, setConnections] = useState<ExternalToolConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addNotification } = useNotification();
  
  useEffect(() => {
    document.title = "Integrations | Accountly";
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchUserConnections();
  }, [user, navigate]);

  const fetchUserConnections = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userConnections = await ExternalToolsService.getUserConnections(user.id);
      setConnections(userConnections);
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (providerId: string) => {
    if (!user) return;
    
    try {
      const success = await ExternalToolsService.connectTool(user.id, providerId);
      
      if (success) {
        toast({
          title: "Connection successful",
          description: `Successfully connected to ${getProviderName(providerId)}`,
        });
        
        addNotification(
          "Integration Connected",
          `Successfully connected to ${getProviderName(providerId)}`,
          "success"
        );
        
        fetchUserConnections();
      } else {
        throw new Error("Failed to connect");
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: `Could not connect to ${getProviderName(providerId)}`,
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async (connectionId: string, providerName: string) => {
    try {
      const success = await ExternalToolsService.disconnectTool(connectionId);
      
      if (success) {
        toast({
          title: "Disconnected",
          description: `Successfully disconnected from ${providerName}`,
        });
        
        fetchUserConnections();
      } else {
        throw new Error("Failed to disconnect");
      }
    } catch (error) {
      toast({
        title: "Error disconnecting",
        description: `Could not disconnect from ${providerName}`,
        variant: "destructive",
      });
    }
  };

  const handleSync = async (connectionId: string, providerName: string) => {
    try {
      const success = await ExternalToolsService.syncTool(connectionId);
      
      if (success) {
        toast({
          title: "Sync complete",
          description: `Successfully synchronized data with ${providerName}`,
        });
        
        fetchUserConnections();
      } else {
        throw new Error("Failed to sync");
      }
    } catch (error) {
      toast({
        title: "Sync failed",
        description: `Could not synchronize with ${providerName}`,
        variant: "destructive",
      });
    }
  };

  const getProviderName = (providerId: string): string => {
    const provider = availableProviders.find(p => p.id === providerId);
    return provider?.name || providerId;
  };

  const getConnectionStatus = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case 'disconnected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Disconnected
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Unknown
          </Badge>
        );
    }
  };

  const isConnected = (providerId: string): boolean => {
    return connections.some(conn => conn.provider === providerId && conn.status === 'connected');
  };

  const getConnectionForProvider = (providerId: string): ExternalToolConnection | undefined => {
    return connections.find(conn => conn.provider === providerId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading integrations...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold">External Integrations</h1>
              <p className="text-muted-foreground">
                Connect your financial accounts and tools to streamline your workflow.
              </p>
            </div>
          </div>
          
          <Alert className="mb-8">
            <div className="flex gap-2">
              <LinkIcon className="h-4 w-4 mt-1" />
              <div>
                <AlertTitle>Connecting your accounts is secure</AlertTitle>
                <AlertDescription>
                  Accountly uses industry-standard security practices to connect to your accounts.
                  We never store your credentials and all data is encrypted.
                </AlertDescription>
              </div>
            </div>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableProviders.map((provider) => {
              const connection = getConnectionForProvider(provider.id);
              const connected = isConnected(provider.id);
              
              return (
                <Card key={provider.id} className={!provider.isAvailable ? "opacity-70" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                          {/* Placeholder for icon */}
                          <span className="font-semibold">{provider.name.charAt(0)}</span>
                        </div>
                        <CardTitle>{provider.name}</CardTitle>
                      </div>
                      
                      {connection && getConnectionStatus(connection.status)}
                    </div>
                    <CardDescription className="mt-2">{provider.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {connected && connection && (
                      <div className="text-sm text-muted-foreground">
                        Last synchronized: {connection.lastSync 
                          ? format(new Date(connection.lastSync), 'MMM d, yyyy h:mm a')
                          : 'Never'
                        }
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {!provider.isAvailable ? (
                      <Button disabled className="w-full">
                        Coming Soon
                      </Button>
                    ) : connected && connection ? (
                      <>
                        <Button 
                          variant="outline" 
                          className="flex-1 mr-2"
                          onClick={() => handleDisconnect(connection.id, provider.name)}
                        >
                          Disconnect
                        </Button>
                        <Button 
                          className="flex-1 ml-2"
                          onClick={() => handleSync(connection.id, provider.name)}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Sync Now
                        </Button>
                      </>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => handleConnect(provider.id)}
                      >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">What happens when you connect?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-accent rounded-lg p-6">
                <div className="bg-accent-foreground/10 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  <ArrowRightCircle className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-2">Data Import</h3>
                <p className="text-sm text-muted-foreground">
                  We securely import your financial data from connected services.
                </p>
              </div>
              
              <div className="bg-accent rounded-lg p-6">
                <div className="bg-accent-foreground/10 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-2">Regular Sync</h3>
                <p className="text-sm text-muted-foreground">
                  Data is automatically updated to keep everything current.
                </p>
              </div>
              
              <div className="bg-accent rounded-lg p-6">
                <div className="bg-accent-foreground/10 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-2">Unified Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  All your financial data appears in one consolidated dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default IntegrationsPage;
