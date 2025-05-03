
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ExternalToolsService, availableProviders } from '@/services/ExternalToolsService';
import { useAuth } from '@/contexts/AuthContext';
import { RefreshCw, Link2, CheckCircle, XCircle } from 'lucide-react';

const IntegrationsHub = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [connectedTools, setConnectedTools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [zapierWebhookUrl, setZapierWebhookUrl] = useState<string>('');

  const handleConnect = async (providerId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to connect external tools.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await ExternalToolsService.connectTool(user.id, providerId);
      
      if (success) {
        toast({
          title: "Connection successful",
          description: `Successfully connected to ${providerId}.`,
        });
        
        // Refresh connected tools list
        if (user) {
          const tools = await ExternalToolsService.getUserConnections(user.id);
          setConnectedTools(tools);
        }
      } else {
        throw new Error("Connection failed");
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: `Failed to connect to ${providerId}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleZapierTest = () => {
    if (!zapierWebhookUrl) {
      toast({
        title: "Webhook URL required",
        description: "Please enter your Zapier webhook URL to test the connection.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulating sending data to Zapier webhook
    toast({
      title: "Test successful",
      description: "Successfully sent test data to Zapier webhook.",
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardTitle className="text-xl">Integrations Hub</CardTitle>
        <CardDescription>Connect with your favorite accounting and business tools</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-medium mb-4">Financial Platforms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableProviders.map((provider) => (
                <Card key={provider.id} className="overflow-hidden">
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                        {provider.icon ? (
                          <img src={provider.icon} alt={provider.name} className="w-8 h-8 object-contain" />
                        ) : (
                          <Link2 className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{provider.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {provider.description}
                        </p>
                      </div>
                    </div>
                    
                    <Badge variant={provider.isAvailable ? "outline" : "secondary"}>
                      {provider.isAvailable ? "Available" : "Coming Soon"}
                    </Badge>
                  </div>
                  
                  <div className="px-4 pb-4 pt-1">
                    <Button 
                      onClick={() => handleConnect(provider.id)}
                      variant="outline" 
                      className="w-full"
                      disabled={!provider.isAvailable || isLoading}
                    >
                      Connect
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-medium mb-4">Advanced Automation</h3>
            
            <Card className="p-4">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-md bg-orange-100 flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <path d="M10 13V11M14 13V11M7 19V15M17 19V15M3 9H21M7 5H17V19C17 20.1046 16.1046 21 15 21H9C7.89543 21 7 20.1046 7 19V5Z" stroke="#FF8E1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Zapier Integration</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Connect to 5,000+ apps with custom workflows
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      Premium
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="zapier-webhook">Webhook URL</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="zapier-webhook" 
                        placeholder="https://hooks.zapier.com/..."
                        value={zapierWebhookUrl}
                        onChange={(e) => setZapierWebhookUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleZapierTest}>Test</Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Create a webhook in Zapier and paste the URL here.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>
          
          <section>
            <h3 className="text-lg font-medium mb-4">Data Synchronization</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Real-time Bank Sync</p>
                    <p className="text-xs text-gray-500">Keep your transactions updated automatically</p>
                  </div>
                </div>
                <Switch id="bank-sync" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Cloud Backup</p>
                    <p className="text-xs text-gray-500">Automated daily backups of your financial data</p>
                  </div>
                </div>
                <Switch id="cloud-backup" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-600">Multi-device Sync</p>
                    <p className="text-xs text-gray-500">Access your data across all devices</p>
                  </div>
                </div>
                <Switch id="device-sync" disabled />
              </div>
            </div>
          </section>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 flex justify-between">
        <Button variant="outline" className="flex items-center gap-1">
          <RefreshCw size={14} />
          Refresh Connections
        </Button>
        
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default IntegrationsHub;
